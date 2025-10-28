import { Hono } from 'npm:hono@4';
import { cors } from 'npm:hono@4/cors';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Configure CORS
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length'],
  maxAge: 86400,
  credentials: true,
}));

// Create Supabase client
const getSupabaseClient = () => {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(supabaseUrl, supabaseKey);
};

const bucketName = 'make-985839ee-products';

// Initialize storage bucket
async function initBucket() {
  try {
    const supabase = getSupabaseClient();
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 5242880 // 5MB
      });
      if (error) {
        console.error(`Error creating bucket: ${error.message}`);
      } else {
        console.log(`Bucket ${bucketName} created successfully`);
      }
    }
  } catch (error) {
    console.error(`Error initializing bucket:`, error);
  }
}

// Initialize bucket on startup
initBucket();

// Health check endpoint
app.get('/make-server-985839ee/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Sign up endpoint
app.post('/make-server-985839ee/signup', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const { email, password, name } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name: name || '' },
      email_confirm: true
    });
    
    if (error) {
      console.error(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.error(`Error during signup:`, error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Get all products (with optional category filter)
app.get('/make-server-985839ee/products', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const category = c.req.query('category');
    const products = await kv.getByPrefix('product:');
    
    if (!products || products.length === 0) {
      return c.json({ products: [] });
    }
    
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter((p: any) => p.category === category);
    }
    
    const productsWithUrls = await Promise.all(
      filteredProducts.map(async (product: any) => {
        try {
          if (product.storagePath) {
            const { data, error: urlError } = await supabase.storage
              .from(bucketName)
              .createSignedUrl(product.storagePath, 43200); // 12 hours
            
            if (urlError) {
              console.error(`Error creating signed URL for ${product.id}: ${urlError.message}`);
              return {
                ...product,
                imageUrl: null
              };
            }
            
            return {
              ...product,
              imageUrl: data?.signedUrl || null
            };
          }
          return {
            ...product,
            imageUrl: null
          };
        } catch (err) {
          console.error(`Error processing product ${product.id}:`, err);
          return {
            ...product,
            imageUrl: null
          };
        }
      })
    );
    
    return c.json({ products: productsWithUrls });
  } catch (error) {
    console.error(`Error fetching products:`, error);
    return c.json({ error: 'Failed to fetch products', details: String(error) }, 500);
  }
});

// Upload product (protected)
app.post('/make-server-985839ee/products', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }
    
    const accessToken = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      console.error(`Authorization error while uploading product: ${authError?.message}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const formData = await c.req.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const precio = formData.get('precio') as string;
    const category = formData.get('category') as string;
    const file = formData.get('file') as File;
    
    if (!file) {
      return c.json({ error: 'File is required' }, 400);
    }
    
    if (!category) {
      return c.json({ error: 'Category is required' }, 400);
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `products/${fileName}`;
    
    const arrayBuffer = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, arrayBuffer, {
        contentType: file.type,
        upsert: false
      });
    
    if (uploadError) {
      console.error(`Error uploading file to storage: ${uploadError.message}`);
      return c.json({ error: 'Failed to upload image', details: uploadError.message }, 500);
    }
    
    const productId = crypto.randomUUID();
    const productData = {
      id: productId,
      name: name || '',
      description: description || '',
      precio: precio || '',
      category: category,
      storagePath: filePath,
      createdAt: new Date().toISOString(),
      createdBy: user.id
    };
    
    await kv.set(`product:${productId}`, productData);
    
    return c.json({ success: true, product: productData });
  } catch (error) {
    console.error(`Error creating product:`, error);
    return c.json({ error: 'Internal server error while creating product', details: String(error) }, 500);
  }
});

// Update product (protected)
app.put('/make-server-985839ee/products/:id', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }
    
    const accessToken = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      console.error(`Authorization error while updating product: ${authError?.message}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const productId = c.req.param('id');
    const { name, description, precio } = await c.req.json();
    
    const existingProduct = await kv.get(`product:${productId}`);
    if (!existingProduct) {
      return c.json({ error: 'Product not found' }, 404);
    }
    
    const updatedProduct = {
      ...existingProduct,
      name: name !== undefined ? name : existingProduct.name,
      description: description !== undefined ? description : existingProduct.description,
      precio: precio !== undefined ? precio : existingProduct.precio,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(`product:${productId}`, updatedProduct);
    
    return c.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(`Error updating product:`, error);
    return c.json({ error: 'Internal server error while updating product', details: String(error) }, 500);
  }
});

// Delete product (protected)
app.delete('/make-server-985839ee/products/:id', async (c) => {
  try {
    const supabase = getSupabaseClient();
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader) {
      return c.json({ error: 'Authorization header required' }, 401);
    }
    
    const accessToken = authHeader.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      console.error(`Authorization error while deleting product: ${authError?.message}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const productId = c.req.param('id');
    const product = await kv.get(`product:${productId}`);
    
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }
    
    if (product.storagePath) {
      const { error: deleteError } = await supabase.storage
        .from(bucketName)
        .remove([product.storagePath]);
      
      if (deleteError) {
        console.error(`Error deleting file from storage: ${deleteError.message}`);
      }
    }
    
    await kv.del(`product:${productId}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.error(`Error deleting product:`, error);
    return c.json({ error: 'Internal server error while deleting product', details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);

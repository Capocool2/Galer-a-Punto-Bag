import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2.39.3';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors());
app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

const bucketName = 'make-985839ee-products';

// Initialize storage bucket
async function initBucket() {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: false,
        fileSizeLimit: 5242880 // 5MB
      });
      if (error) {
        console.log(`Error creating bucket: ${error.message}`);
      } else {
        console.log(`Bucket ${bucketName} created successfully`);
      }
    }
  } catch (error) {
    console.log(`Error initializing bucket: ${error}`);
  }
}

initBucket();

// Sign up endpoint
app.post('/make-server-985839ee/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.log(`Signup error: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log(`Error during signup: ${error}`);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Get all products (with optional category filter)
app.get('/make-server-985839ee/products', async (c) => {
  try {
    const category = c.req.query('category');
    const products = await kv.getByPrefix('product:');
    
    // If no products, return empty array
    if (!products || products.length === 0) {
      return c.json({ products: [] });
    }
    
    // Filter by category if specified
    let filteredProducts = products;
    if (category) {
      filteredProducts = products.filter((p: any) => p.category === category);
    }
    
    // Generate signed URLs for product images (1 mes = 2592000 segundos)
    const productsWithUrls = await Promise.all(
      filteredProducts.map(async (product: any) => {
        try {
          if (product.storagePath) {
            const { data, error: urlError } = await supabase.storage
              .from(bucketName)
              .createSignedUrl(product.storagePath, 2592000); // 1 month (30 days)
            
            if (urlError) {
              console.log(`Error creating signed URL for ${product.id}: ${urlError.message}`);
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
          console.log(`Error processing product ${product.id}: ${err}`);
          return {
            ...product,
            imageUrl: null
          };
        }
      })
    );
    
    return c.json({ products: productsWithUrls });
  } catch (error) {
    console.log(`Error fetching products: ${error}`);
    return c.json({ error: 'Failed to fetch products', details: String(error) }, 500);
  }
});

// Upload product (protected)
app.post('/make-server-985839ee/products', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      console.log(`Authorization error while uploading product: ${authError?.message}`);
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
    
    // Upload file to storage
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
      console.log(`Error uploading file to storage: ${uploadError.message}`);
      return c.json({ error: 'Failed to upload image' }, 500);
    }
    
    // Save product data
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
    console.log(`Error creating product: ${error}`);
    return c.json({ error: 'Internal server error while creating product' }, 500);
  }
});

// Update product (protected)
app.put('/make-server-985839ee/products/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      console.log(`Authorization error while updating product: ${authError?.message}`);
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
    console.log(`Error updating product: ${error}`);
    return c.json({ error: 'Internal server error while updating product' }, 500);
  }
});

// Delete product (protected)
app.delete('/make-server-985839ee/products/:id', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    
    if (!user || authError) {
      console.log(`Authorization error while deleting product: ${authError?.message}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const productId = c.req.param('id');
    const product = await kv.get(`product:${productId}`);
    
    if (!product) {
      return c.json({ error: 'Product not found' }, 404);
    }
    
    // Delete from storage
    if (product.storagePath) {
      const { error: deleteError } = await supabase.storage
        .from(bucketName)
        .remove([product.storagePath]);
      
      if (deleteError) {
        console.log(`Error deleting file from storage: ${deleteError.message}`);
      }
    }
    
    // Delete from KV store
    await kv.del(`product:${productId}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Error deleting product: ${error}`);
    return c.json({ error: 'Internal server error while deleting product' }, 500);
  }
});

Deno.serve(app.fetch);

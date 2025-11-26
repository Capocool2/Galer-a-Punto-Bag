/**
 * INFORMACIÓN IMPORTANTE: Creación de Usuarios Administradores
 * 
 * Los usuarios administradores DEBEN crearse desde el panel de Supabase
 * por razones de seguridad. No existe un usuario "admin" por defecto.
 * 
 * PASOS PARA CREAR UN ADMINISTRADOR:
 * 
 * 1. Ve a tu proyecto en Supabase Dashboard (https://supabase.com/dashboard)
 * 2. Navega a: Authentication → Users
 * 3. Haz clic en: "Add user" → "Create new user"
 * 4. Ingresa el email y contraseña deseados
 * 5. IMPORTANTE: Marca la opción "Auto Confirm User"
 * 6. Haz clic en "Create user"
 * 7. Usa esas credenciales para iniciar sesión en la aplicación
 * 
 * NOTA: Este enfoque es más seguro que crear usuarios desde el código
 * porque requiere acceso directo al panel de Supabase.
 */

export const createAdminInstructions = `
⚠️ Los usuarios administradores deben crearse desde el panel de Supabase.

Para crear un administrador:
1. Ve a https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Navega a Authentication → Users
4. Haz clic en "Add user" → "Create new user"
5. Ingresa email y contraseña
6. Marca "Auto Confirm User"
7. Guarda y usa esas credenciales para iniciar sesión
`;

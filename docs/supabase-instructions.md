# Instrucciones para Supabase en el Proyecto

## Configuración realizada

El proyecto está conectado a la instancia remota de Supabase con referencia `fhtfltdbrnatasrmufet`. La configuración incluye:

- URL de Supabase: `https://fhtfltdbrnatasrmufet.supabase.co`
- Clave Anónima para operaciones de cliente
- Clave de Service Role para operaciones privilegiadas desde el servidor

## Cómo utilizar Supabase en el proyecto

### Autenticación

```typescript
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// En componentes del cliente
const supabase = createClientComponentClient();

// Iniciar sesión con email y contraseña
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "password123",
});

// Cerrar sesión
await supabase.auth.signOut();
```

### Acceso a datos

```typescript
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// En componentes del cliente
const supabase = createClientComponentClient();

// Consultar datos
const { data, error } = await supabase
  .from("tabla")
  .select("*")
  .order("created_at", { ascending: false });
```

### Almacenamiento

```typescript
// Subir archivo
const { data, error } = await supabase.storage
  .from("bucket")
  .upload("ruta/archivo.jpg", archivo, {
    cacheControl: "3600",
    upsert: false,
  });

// Obtener URL pública
const { data } = supabase.storage
  .from("bucket")
  .getPublicUrl("ruta/archivo.jpg");
```

## Desarrollo local vs remoto

Para alternar entre desarrollo local y remoto:

1. Para desarrollo local, usar el archivo `.env.local.dev` con las credenciales locales
2. Para conectar con la instancia remota, usar el archivo `.env.local` actual

## Mantenimiento y Gestión

Para gestionar la instancia de Supabase:

1. Ingresar al panel de control: [https://app.supabase.com/project/fhtfltdbrnatasrmufet](https://app.supabase.com/project/fhtfltdbrnatasrmufet)
2. Utilizar CLI para sincronización:
   ```bash
   # Sincronizar tipos locales con la instancia remota
   npx supabase gen types typescript --project-id fhtfltdbrnatasrmufet > types/supabase.ts
   ```

## Notas adicionales

- Es recomendable mantener actualizado el esquema local con el remoto
- Para cambios de esquema importantes, usar migraciones
- Las claves secretas nunca deben incluirse en el código fuente

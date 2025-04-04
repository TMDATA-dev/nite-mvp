// Cargar variables de entorno
require("dotenv").config({ path: ".env.local" });

console.log("Probando la conexión con Supabase...");

const { createClient } = require("@supabase/supabase-js");

// Crear el cliente de Supabase con las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log("URL:", supabaseUrl);
console.log("Clave disponible:", supabaseAnonKey ? "Sí" : "No");

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // Intentar obtener la sesión actual (no requiere autenticación)
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error al conectar con Supabase:", error.message);
    } else {
      console.log("Conexión con Supabase establecida correctamente");
      console.log("Sesión:", data ? "Disponible" : "No disponible");
    }
  } catch (err) {
    console.error("Excepción al conectar con Supabase:", err.message);
  }
}

// Ejecutar la prueba
testConnection();

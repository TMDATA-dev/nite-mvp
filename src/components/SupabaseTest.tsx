"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function SupabaseTest() {
  const [status, setStatus] = useState<"loading" | "connected" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        // Intenta hacer una consulta simple para comprobar la conexión
        const { data, error } = await supabase
          .from("pg_stat_statements")
          .select("*")
          .limit(1);

        if (error) throw error;

        // Obtiene la versión de PostgreSQL
        const { data: versionData, error: versionError } = await supabase.rpc(
          "version"
        );

        if (versionError) {
          setVersion("Versión no disponible");
        } else {
          setVersion(versionData);
        }

        setStatus("connected");
      } catch (error) {
        console.error("Error al conectar con Supabase:", error);
        setStatus("error");
        setErrorMessage(
          error instanceof Error ? error.message : "Error desconocido"
        );
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-xl font-bold mb-4">Estado de Supabase</h2>

      {status === "loading" && (
        <div className="text-blue-500">Conectando a Supabase...</div>
      )}

      {status === "connected" && (
        <div>
          <div className="text-green-500 font-medium">
            ✅ Conectado a Supabase correctamente
          </div>
          {version && (
            <div className="mt-2 text-sm">Versión PostgreSQL: {version}</div>
          )}
        </div>
      )}

      {status === "error" && (
        <div>
          <div className="text-red-500 font-medium">
            ❌ Error al conectar con Supabase
          </div>
          {errorMessage && (
            <div className="mt-2 text-sm overflow-auto max-h-40">
              {errorMessage}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/types/supabase";

export default function AudioMessages() {
  const [messages, setMessages] = useState<Tables<"audio_messages">[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAudioMessages() {
      try {
        setLoading(true);

        // Obtener la sesión actual para verificar si el usuario está autenticado
        const { data: sessionData } = await supabase.auth.getSession();

        if (!sessionData.session) {
          setError("Debes iniciar sesión para ver los mensajes de audio");
          setLoading(false);
          return;
        }

        // Cargar los mensajes de audio del usuario actual
        const { data, error } = await supabase
          .from("audio_messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        setMessages(data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los mensajes de audio:", error);
        setError(error instanceof Error ? error.message : "Error desconocido");
        setLoading(false);
      }
    }

    fetchAudioMessages();
  }, []);

  if (loading) {
    return <div className="p-4">Cargando mensajes de audio...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (messages.length === 0) {
    return (
      <div className="p-4 text-gray-500">
        No hay mensajes de audio disponibles. ¡Crea tu primer mensaje!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Mis Mensajes de Audio</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {messages.map((message) => (
          <div key={message.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">
                {new Date(message.created_at).toLocaleString()}
              </span>
              {message.duration && (
                <span className="text-sm">{message.duration}s</span>
              )}
            </div>

            {message.audio_url && (
              <audio controls className="w-full mb-2">
                <source src={message.audio_url} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            )}

            {message.transcription && (
              <div className="text-sm mt-2">
                <p className="font-medium">Transcripción:</p>
                <p className="text-gray-700">{message.transcription}</p>
              </div>
            )}

            {message.message_content && (
              <div className="text-sm mt-2">
                <p className="font-medium">Mensaje:</p>
                <p className="text-gray-700">{message.message_content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AudioMessageForm() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [messageContent, setMessageContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Variables para la grabación
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  // Iniciar grabación
  const startRecording = async () => {
    try {
      setError(null);
      setSuccess(false);

      // Verificar si el usuario está autenticado
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        setError("Debes iniciar sesión para grabar un mensaje de audio");
        return;
      }

      // Solicitar permisos de micrófono
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/mpeg" });
        setAudioBlob(blob);
        setAudioChunks(chunks);

        // Detener todas las pistas de audio
        stream.getTracks().forEach((track) => track.stop());
      };

      setAudioChunks([]);
      setAudioBlob(null);
      setMediaRecorder(recorder);

      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error al iniciar la grabación:", error);
      setError("No se pudo acceder al micrófono. Verifica los permisos.");
    }
  };

  // Detener grabación
  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // Subir mensaje de audio
  const uploadAudioMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!audioBlob) {
      setError("No hay grabación de audio para subir");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);

      // Verificar si el usuario está autenticado
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        setError("Debes iniciar sesión para subir un mensaje de audio");
        setIsUploading(false);
        return;
      }

      const userId = sessionData.session.user.id;

      // Generar un nombre único para el archivo
      const fileName = `${userId}/${Date.now()}.mp3`;

      // Subir el archivo de audio a Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("audio-messages")
        .upload(fileName, audioBlob, {
          contentType: "audio/mpeg",
          cacheControl: "3600",
        });

      if (uploadError) throw uploadError;

      // Crear la URL pública
      const { data: publicUrlData } = supabase.storage
        .from("audio-messages")
        .getPublicUrl(fileName);

      // Crear un registro en la tabla audio_messages
      const { error: insertError } = await supabase
        .from("audio_messages")
        .insert({
          user_id: userId,
          message_content: messageContent || null,
          audio_url: publicUrlData.publicUrl,
          duration: null, // Podrías calcular esto si tienes acceso a la duración
          transcription: null, // Podrías usar un servicio de transcripción
        });

      if (insertError) throw insertError;

      // Resetear el formulario
      setAudioBlob(null);
      setMessageContent("");
      setSuccess(true);
      setIsUploading(false);
    } catch (error) {
      console.error("Error al subir el mensaje de audio:", error);
      setError(error instanceof Error ? error.message : "Error desconocido");
      setIsUploading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h2 className="text-xl font-bold mb-4">Grabar mensaje de audio</h2>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 p-3 rounded-md mb-4">
          ¡Mensaje de audio subido con éxito!
        </div>
      )}

      <form onSubmit={uploadAudioMessage} className="space-y-4">
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mensaje (opcional)
          </label>
          <textarea
            id="message"
            className="w-full border rounded-md p-2"
            rows={3}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            placeholder="Añade un mensaje o descripción para tu grabación..."
          />
        </div>

        <div className="flex justify-center py-4">
          {!isRecording && !audioBlob && (
            <button
              type="button"
              onClick={startRecording}
              className="px-4 py-2 bg-red-600 text-white rounded-full shadow-sm hover:bg-red-700 focus:outline-none"
            >
              Iniciar grabación
            </button>
          )}

          {isRecording && (
            <button
              type="button"
              onClick={stopRecording}
              className="px-4 py-2 bg-gray-600 text-white rounded-full shadow-sm hover:bg-gray-700 focus:outline-none animate-pulse"
            >
              Detener grabación
            </button>
          )}

          {audioBlob && !isRecording && (
            <audio controls className="w-full">
              <source src={URL.createObjectURL(audioBlob)} type="audio/mpeg" />
              Tu navegador no soporta el elemento de audio.
            </audio>
          )}
        </div>

        {audioBlob && !isRecording && (
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setAudioBlob(null);
                setError(null);
                setSuccess(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              disabled={isUploading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              disabled={isUploading}
            >
              {isUploading ? "Subiendo..." : "Guardar mensaje"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

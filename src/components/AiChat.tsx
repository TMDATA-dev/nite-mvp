"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Loader2,
  Wifi,
  Clock,
  UtensilsCrossed,
  Car,
  Map,
  Info,
  Headphones,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { AudioMessage } from "./AudioMessage";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/auth";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  recordingUrl?: string;
}

interface QuickQuestion {
  icon: React.ReactNode;
  text: string;
  query: string;
}

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const quickQuestions: QuickQuestion[] = [
    {
      icon: <Wifi className="w-4 h-4" />,
      text: "WiFi Password",
      query: "What's the WiFi password?",
    },
    {
      icon: <Clock className="w-4 h-4" />,
      text: "Check-in/out Times",
      query: "What are the check-in and check-out times?",
    },
    {
      icon: <UtensilsCrossed className="w-4 h-4" />,
      text: "Restaurant Hours",
      query: "What are the restaurant hours?",
    },
    {
      icon: <Car className="w-4 h-4" />,
      text: "Parking Info",
      query: "Where can I park my car?",
    },
    {
      icon: <Map className="w-4 h-4" />,
      text: "Local Attractions",
      query: "What are the nearby attractions?",
    },
    {
      icon: <Info className="w-4 h-4" />,
      text: "Hotel Amenities",
      query: "What amenities does the hotel offer?",
    },
    {
      icon: <Headphones className="w-4 h-4" />,
      text: "Audio Demo",
      query: "Show me an audio message demo",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Verificar detalles del usuario y la autenticación
    const checkAuthStatus = async () => {
      if (user) {
        console.log("Usuario autenticado:", user.id);
        console.log("Detalles completos del usuario:", user);

        // Verificar si la sesión actual es válida
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("Sesión actual:", sessionData.session);

        // Verificar datos en la tabla de usuarios
        try {
          const { data: authUser, error: authError } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id)
            .single();

          if (authError) {
            console.error("Error al obtener usuario:", authError);
          } else {
            console.log("Datos del usuario en la base de datos:", authUser);
          }
        } catch (e) {
          console.error("Error al consultar la base de datos:", e);
        }
      } else {
        console.log("No hay usuario autenticado");

        // Verificar estado de la sesión cuando no hay usuario
        const { data: sessionData } = await supabase.auth.getSession();
        console.log("Estado de sesión sin usuario:", sessionData);
      }
    };

    checkAuthStatus();
  }, [user]);

  const handleSubmit = async (e?: React.FormEvent, submittedInput?: string) => {
    if (e) {
      e.preventDefault();
    }

    const messageText = submittedInput || input;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageText,
      role: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // URL configurado en n8n "When chat message received"
      const response = await fetch(
        "https://primary-production-2971.up.railway.app/webhook/977f8f3a-c1b6-4544-9a39-dd0e47bd8836/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            // Formato compatible con n8n
            message: messageText,
            sessionId: user?.id || "guest-" + Date.now(),
            userId: user?.id || "guest",
            auth_user_id: user?.id,
            language: navigator.language.startsWith("es") ? "es" : "en",
            timestamp: new Date().toISOString(),
            // Metadata adicional que puede ser útil en n8n
            metadata: {
              source: "web-chat",
              userAgent: navigator.userAgent,
              email: user?.email,
              is_authenticated: !!user,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const content =
        data.output ||
        "I apologize, but I cannot understand the response format.";

      // Determinar si debemos mostrar un ejemplo de audio demo
      let recordingUrl;
      if (
        messageText.toLowerCase().includes("audio") ||
        messageText.toLowerCase().includes("demo")
      ) {
        recordingUrl =
          "https://storage.vapi.ai/3acc42b2-1523-4b37-b536-1f10ad44025c-1743531534146-9d773a4f-04c8-4f7f-8482-ffbd1a596803-mono.wav";

        // Enviar la URL de audio a n8n para que la procese
        try {
          const audioNotification = await fetch(
            "https://primary-production-2971.up.railway.app/webhook/977f8f3a-c1b6-4544-9a39-dd0e47bd8836/chat",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: "AUDIO_URL_NOTIFICATION",
                sessionId: user?.id || "guest-" + Date.now(),
                userId: user?.id || "guest",
                auth_user_id: user?.id,
                audioUrl: recordingUrl,
                messageType: "audio",
                timestamp: new Date().toISOString(),
                originalMessage: messageText,
                is_authenticated: !!user,
              }),
            }
          );

          console.log(
            "Notificación de audio enviada a n8n:",
            await audioNotification.json()
          );
        } catch (error) {
          console.warn("No se pudo notificar a n8n sobre el audio:", error);
        }
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: content.trim(),
        role: "assistant",
        recordingUrl,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error getting assistant response:", error);
      const errorMessage = navigator.language.startsWith("es")
        ? "Lo siento, pero no puedo responder en este momento. Por favor, inténtelo de nuevo más tarde."
        : "I apologize, but I cannot respond at the moment. Please try again later.";

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: errorMessage,
          role: "assistant",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Esta función podría ser usada si necesitamos procesar el audio manualmente
  const processAudio = async (recordingUrl: string) => {
    try {
      // Primero intentamos usar la función de Supabase
      const { data, error } = await supabase.functions.invoke("audio-player", {
        body: { recordingUrl },
      });

      if (error) {
        console.error("Error processing audio with Supabase:", error);
        return recordingUrl; // Fallback a la URL directa
      }

      return data.processedUrl || recordingUrl;
    } catch (error) {
      console.error("Error calling Supabase function:", error);
      return recordingUrl; // Fallback a la URL directa
    }
  };

  const handleQuickQuestion = (query: string) => {
    handleSubmit(undefined, query);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="p-4 bg-gradient-to-b from-gray-50/50 to-white border-b border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuickQuestion(question.query)}
              className="flex items-center gap-2 p-3 rounded-xl bg-white border border-gray-200 hover:border-yellow-500/50 hover:shadow-md transition-all text-left"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-900/5 flex items-center justify-center text-blue-900">
                {question.icon}
              </div>
              <span className="text-sm font-medium text-gray-700">
                {question.text}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-[400px] overflow-y-auto p-6 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                  message.role === "user"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-50 text-gray-900 border border-gray-100"
                }`}
              >
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>{message.content}</ReactMarkdown>
                </div>

                {message.recordingUrl && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <AudioMessage url={message.recordingUrl} />
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-50 rounded-2xl p-4 shadow-sm border border-gray-100">
                <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 via-white to-gray-50"
      >
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about the hotel..."
            className="flex-1 rounded-xl border-gray-200 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-200 bg-white text-gray-900"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

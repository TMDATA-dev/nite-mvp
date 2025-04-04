"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Moon,
  ArrowRight,
  ChevronRight,
  CompassIcon,
  HeartIcon,
  MessageCircleIcon,
  Mic,
  CarIcon,
} from "lucide-react";
import SupabaseTest from "@/components/SupabaseTest";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [showSupabaseTest, setShowSupabaseTest] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Comprobar si el usuario está autenticado
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };

    checkAuth();
  }, []);

  const handleGetStarted = () => {
    // Navegar a la página de registro
    router.push("/signup");
  };

  const handleLearnMore = () => {
    // Mostrar modal con más información
    setShowModal(true);
  };

  // Función para mostrar/ocultar el componente de prueba de Supabase
  const toggleSupabaseTest = () => {
    setShowSupabaseTest(!showSupabaseTest);
  };

  return (
    <div className="flex flex-col min-h-screen font-mono relative bg-black">
      {/* Fondo con patrón de cuadrícula */}
      <div className="fixed inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-30 pointer-events-none"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Barra de navegación */}
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-2">
            <Moon className="h-5 w-5 fill-yellow-400" />
            <span className="font-bold text-xl tracking-tighter">nite</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/login">
              <button className="btn btn-secondary transition-colors hover:border-yellow-500/50">
                Log in
              </button>
            </Link>
            <Link href="/signup">
              <button className="btn btn-primary transition-colors">
                Sign up
              </button>
            </Link>
            {/* Botón para probar Supabase */}
            <button
              onClick={toggleSupabaseTest}
              className="btn btn-secondary transition-colors hover:border-green-500/50"
            >
              {showSupabaseTest ? "Ocultar Test" : "Test Supabase"}
            </button>
          </div>
        </header>

        {/* Mostrar el componente de prueba si showSupabaseTest es true */}
        {showSupabaseTest && (
          <div className="my-4">
            <SupabaseTest />
          </div>
        )}

        {/* Servicios para usuarios autenticados */}
        {isLoggedIn && (
          <div className="mt-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Servicios disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Servicio de Taxi */}
              <Link href="/taxi" className="block">
                <div className="border border-gray-800 rounded-lg p-4 hover:bg-gray-900/50 transition-colors">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-yellow-400/10 flex items-center justify-center">
                      <CarIcon className="h-4 w-4 text-yellow-400" />
                    </div>
                    <h3 className="font-bold">Taxi Service</h3>
                  </div>
                  <p className="text-sm text-gray-400">
                    Solicita un taxi para tu destino
                  </p>
                </div>
              </Link>

              {/* Mensajes de Audio */}
              <Link href="/audio-messages" className="block">
                <div className="border border-gray-800 rounded-lg p-4 hover:bg-gray-900/50 transition-colors">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-yellow-400/10 flex items-center justify-center">
                      <Mic className="h-4 w-4 text-yellow-400" />
                    </div>
                    <h3 className="font-bold">Mensajes de Audio</h3>
                  </div>
                  <p className="text-sm text-gray-400">
                    Graba y gestiona tus mensajes de audio
                  </p>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <main className="flex flex-col lg:flex-row gap-12 py-16 lg:py-24">
          <div className="flex-1 space-y-8 lg:pr-12">
            {/* Badge de "What's new" */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium tracking-tight bg-gray-800/60 border border-gray-700/50">
              <span className="text-yellow-400">What's new</span>
              <span className="h-1 w-1 rounded-full bg-gray-400"></span>
              <span>Just launched</span>
            </div>

            {/* Título y descripción */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                Your Personal Hotel{" "}
                <span className="text-yellow-400">Concierge</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-400 tracking-tight max-w-2xl">
                Enhance your stay with our AI assistant that helps you discover
                local attractions, manage reservations, and access personalized
                recommendations, all in one place.
              </p>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleGetStarted}
                className="btn btn-primary group transition-colors flex items-center justify-center"
              >
                Get started{" "}
                <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleLearnMore}
                className="btn btn-secondary transition-colors hover:border-yellow-500/50"
              >
                Learn more
              </button>
            </div>
          </div>

          {/* Tarjeta lateral */}
          <div className="lg:w-96 p-6 rounded-2xl bg-gray-900/70 backdrop-blur-sm border border-gray-800/50">
            <div className="space-y-6">
              <h2 className="text-xl font-bold tracking-tight">Features</h2>
              <div className="space-y-4">
                {/* Característica 1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-400/10 flex items-center justify-center">
                    <MessageCircleIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold tracking-tight">
                      AI-Powered Assistance
                    </h3>
                    <p className="text-sm text-gray-400 tracking-tight">
                      Get instant answers to all your questions during your
                      stay.
                    </p>
                  </div>
                </div>

                {/* Característica 2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-400/10 flex items-center justify-center">
                    <CompassIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold tracking-tight">
                      Local Recommendations
                    </h3>
                    <p className="text-sm text-gray-400 tracking-tight">
                      Discover the best local attractions, restaurants, and
                      activities.
                    </p>
                  </div>
                </div>

                {/* Característica 3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-yellow-400/10 flex items-center justify-center">
                    <HeartIcon className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold tracking-tight">24/7 Support</h3>
                    <p className="text-sm text-gray-400 tracking-tight">
                      Always available to assist with any requests during your
                      stay.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Learn More */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-2xl mx-4 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              Discover nite
            </h2>
            <div className="space-y-4 text-gray-300">
              <p>
                Nite is your personal hotel concierge, available 24/7 to enhance
                your experience during your stay.
              </p>
              <h3 className="text-lg font-bold mt-4">How it works</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Immediate assistance for all your needs</li>
                <li>
                  Personalized recommendations for restaurants and attractions
                </li>
                <li>Reservations for hotel services and facilities</li>
                <li>Instant answers to your questions</li>
              </ul>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setShowModal(false);
                    router.push("/signup");
                  }}
                  className="btn btn-primary"
                >
                  Get started now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

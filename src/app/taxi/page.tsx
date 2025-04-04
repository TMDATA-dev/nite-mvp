"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TaxiOrder() {
  const [phoneNumber, setPhoneNumber] = useState("+34614407524");
  const [callTime, setCallTime] = useState(
    new Date().toISOString().slice(0, 16)
  ); // Format: yyyy-MM-ddTHH:mm
  const [listenUrl, setListenUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCallTaxi = async () => {
    setLoading(true);
    setError(null);
    setListenUrl(null);

    try {
      // Simular una respuesta exitosa para demo
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // En un entorno real, se haría una llamada a un endpoint
      // const res = await fetch("/api/call-taxi", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     phoneNumber,
      //     callTime: new Date(callTime).toISOString()
      //   })
      // });
      // const data = await res.json();
      // if (!res.ok) throw new Error(data.error || "Something went wrong");
      // setListenUrl(data.listenUrl);

      // Simulación:
      setListenUrl("https://example.com/recordings/sample-taxi-call-12345.mp3");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
        <div className="mb-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </div>

        <img
          src="https://images.unsplash.com/photo-1549921296-3a7a5b4511af?auto=format&fit=crop&w=800&q=80"
          alt="Taxi"
          className="rounded-xl mb-6 w-full object-cover h-48"
        />

        <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Book a Taxi
        </h1>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Pickup Time
        </label>
        <input
          type="datetime-local"
          value={callTime}
          onChange={(e) => setCallTime(e.target.value)}
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        <button
          onClick={handleCallTaxi}
          disabled={loading}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-lg transition"
        >
          {loading ? "Calling Taxi..." : "Call Taxi"}
        </button>

        {listenUrl && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Listen to the call:</p>
            <a
              href={listenUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-words"
            >
              {listenUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="mt-4 text-red-500 text-center text-sm">
            🚨 {error}
          </div>
        )}
      </div>
    </div>
  );
}

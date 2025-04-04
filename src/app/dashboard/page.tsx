"use client";

import React from "react";
import {
  MessageSquare,
  Car,
  UtensilsCrossed,
  LogOut,
  Headphones,
} from "lucide-react";
import { useAuth } from "../../lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AiChat from "../../components/AiChat";

export default function Dashboard() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex flex-col flex-grow px-4">
            <nav className="flex-1 space-y-1">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-900 rounded-lg border-2 border-yellow-500 transition-colors"
              >
                <MessageSquare className="w-5 h-5 mr-3 text-gray-900" />
                Nite Assistance
              </a>
              <Link
                href="/taxi"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg border border-transparent hover:border-yellow-500/50 transition-all"
              >
                <Car className="w-5 h-5 mr-3 text-gray-400" />
                Taxi Order
              </Link>
              <Link
                href="/audio-messages"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg border border-transparent hover:border-yellow-500/50 transition-all"
              >
                <Headphones className="w-5 h-5 mr-3 text-gray-400" />
                Audio Demo
              </Link>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg border border-transparent hover:border-yellow-500/50 transition-all"
              >
                <UtensilsCrossed className="w-5 h-5 mr-3 text-gray-400" />
                Food Order
              </a>
              <button
                onClick={handleSignOut}
                className="flex w-full items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg border border-transparent hover:border-red-200 transition-all mt-auto"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <AiChat />
          </div>
        </main>
      </div>
    </div>
  );
}

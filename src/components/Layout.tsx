import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon } from "lucide-react";
import { useAuth } from "../lib/auth";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-900">
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isHome
            ? "bg-transparent"
            : "bg-gray-900/95 backdrop-blur-sm border-b border-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="group flex items-center space-x-2">
                <Moon className="h-8 w-8 text-yellow-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                <span className="text-2xl font-semibold text-white">nite</span>
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              {!user && (
                <>
                  <Link
                    to="/login"
                    className="group relative px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    <span>Log in</span>
                    <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                  </Link>
                  <Link
                    to="/signup"
                    className="relative inline-flex h-9 items-center justify-center rounded-full bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 focus:ring-offset-2 focus:ring-offset-gray-900"
                  >
                    <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className={isHome ? "" : "pt-16"}>{children}</main>
    </div>
  );
}

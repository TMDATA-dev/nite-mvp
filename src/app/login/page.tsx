"use client";

import React, { useState } from "react";
import { Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../lib/auth";

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error en inicio de sesión:", err);
      if (err.message.includes("Invalid login credentials")) {
        setError(
          "Email o contraseña incorrectos. Por favor, inténtalo de nuevo."
        );
      } else if (err.message.includes("Email not confirmed")) {
        setError(
          "Tu correo electrónico no ha sido confirmado. Por favor, revisa tu bandeja de entrada."
        );
      } else {
        setError(err.message || "Falló el inicio de sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24 bg-gray-900">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center">
            <Moon className="h-10 w-10 text-yellow-400 stroke-[1.5]" />
            <span className="ml-2 text-3xl font-semibold text-white">nite</span>
          </div>
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-300">
            Not a member?{" "}
            <Link
              href="/signup"
              className="font-semibold text-yellow-400 hover:text-yellow-300"
            >
              Create an account
            </Link>
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
              {error}
            </div>
          )}

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-300"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="block w-full rounded-lg border-0 bg-gray-800/50 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-300"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="block w-full rounded-lg border-0 bg-gray-800/50 py-2 px-3 text-white shadow-sm ring-1 ring-inset ring-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    disabled={loading}
                    className="h-4 w-4 rounded border-gray-700 bg-gray-800/50 text-yellow-400 focus:ring-yellow-400 disabled:cursor-not-allowed"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-300"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold text-yellow-400 hover:text-yellow-300"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-lg bg-yellow-400 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80"
          alt="Hotel lobby at night"
        />
      </div>
    </div>
  );
}

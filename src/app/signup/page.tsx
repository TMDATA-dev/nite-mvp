"use client";

import React, { useState } from "react";
import { Moon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../lib/auth";

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await signUp(email, password);
      setSuccess(
        "Cuenta creada exitosamente. Por favor, verifica tu correo electrónico si es necesario."
      );
      // No redireccionamos automáticamente, ya que Supabase puede requerir verificación de email
    } catch (err: any) {
      setError(err.message);
      if (err.message.includes("already exists")) {
        // Clear password field when account exists
        setPassword("");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <div className="flex min-h-screen flex-1 bg-white">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center">
            <Moon className="h-10 w-10 text-yellow-400 stroke-[1.5]" />
            <span className="ml-2 text-3xl font-semibold text-gray-900">
              nite
            </span>
          </div>
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-yellow-400 hover:text-gray-900"
            >
              Sign in
            </Link>
          </p>

          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <div className="mt-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
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
                    onChange={handleEmailChange}
                    disabled={loading}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-400 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading || success !== ""}
                  className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating account...
                    </div>
                  ) : success ? (
                    <Link href="/login" className="text-white hover:text-white">
                      Ir a iniciar sesión
                    </Link>
                  ) : (
                    "Create account"
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
          src="https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="Social media dashboard"
        />
      </div>
    </div>
  );
}

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "./supabase";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  setUser: (user: User | null) => void;
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      signIn: async (email: string, password: string) => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            throw new Error(error.message);
          }

          if (data?.user) {
            set({
              user: {
                id: data.user.id,
                email: data.user.email || "",
                name: data.user.user_metadata?.name,
              },
            });
          }
        } catch (err: any) {
          console.error("Error de inicio de sesión:", err);
          throw err;
        }
      },
      signUp: async (email: string, password: string) => {
        try {
          // Validar formato de email
          const cleanEmail = email.toLowerCase().trim();
          if (!EMAIL_REGEX.test(cleanEmail)) {
            throw new Error("Por favor, introduce un email válido");
          }

          const { data, error } = await supabase.auth.signUp({
            email: cleanEmail,
            password,
          });

          if (error) {
            throw new Error(error.message);
          }

          if (data?.user) {
            set({
              user: {
                id: data.user.id,
                email: data.user.email || "",
                name: data.user.user_metadata?.name,
              },
            });
          }
        } catch (err: any) {
          console.error("Error de registro:", err);
          throw err;
        }
      },
      signOut: async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) {
            throw new Error(error.message);
          }
          set({ user: null });
        } catch (err: any) {
          console.error("Error al cerrar sesión:", err);
          throw err;
        }
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: "auth-storage", // nombre para el almacenamiento en localStorage
    }
  )
);

// Inicializar estado de autenticación al cargar
if (typeof window !== "undefined") {
  // Verifica si hay una sesión activa al cargar
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      useAuth.getState().setUser({
        id: session.user.id,
        email: session.user.email || "",
        name: session.user.user_metadata?.name,
      });
    }
    useAuth.setState({ loading: false });
  });

  // Configura el listener para cambios en la autenticación
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === "SIGNED_IN" && session?.user) {
      useAuth.getState().setUser({
        id: session.user.id,
        email: session.user.email || "",
        name: session.user.user_metadata?.name,
      });
    } else if (event === "SIGNED_OUT") {
      useAuth.getState().setUser(null);
    }
  });
}

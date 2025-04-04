export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      // Aquí se definirán tus tablas cuando las crees en Supabase
      audio_messages: {
        Row: {
          id: string;
          user_id: string;
          message_content: string | null;
          audio_url: string;
          duration: number | null;
          transcription: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          message_content?: string | null;
          audio_url: string;
          duration?: number | null;
          transcription?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          message_content?: string | null;
          audio_url?: string;
          duration?: number | null;
          transcription?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      // Define tus vistas aquí si las tienes
    };
    Functions: {
      // Define tus funciones aquí si las tienes
    };
    Enums: {
      // Define tus tipos enumerados aquí si los tienes
    };
  };
  // Definición de tablas de autenticación que Supabase maneja internamente
  auth: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          phone: string | null;
          created_at: string;
          updated_at: string | null;
          last_sign_in_at: string | null;
        };
      };
    };
  };
}

// Tipo de ayuda para acceder a tablas específicas
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

// Tipo de ayuda para acceder a tablas de autenticación
export type AuthTables<T extends keyof Database["auth"]["Tables"]> =
  Database["auth"]["Tables"][T]["Row"];

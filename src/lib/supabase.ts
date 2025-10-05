import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          first_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          first_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          first_name?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      design_systems: {
        Row: {
          id: string
          name: string
          author_id: string
          author_username: string
          tags: string[]
          prompt: string | null
          creativity_scale: number
          tokens: Record<string, unknown> | null
          preview_image_url: string | null
          remixed_from: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          author_id: string
          author_username: string
          tags?: string[]
          prompt?: string | null
          creativity_scale?: number
          tokens?: Record<string, unknown> | null
          preview_image_url?: string | null
          remixed_from?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          author_id?: string
          author_username?: string
          tags?: string[]
          prompt?: string | null
          creativity_scale?: number
          tokens?: Record<string, unknown> | null
          preview_image_url?: string | null
          remixed_from?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      user_generations: {
        Row: {
          id: string
          user_id: string
          design_system_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          design_system_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          design_system_id?: string
          created_at?: string
        }
      }
    }
  }
}

import type { Database } from '../supabase/types'

type User = Database['public']['Tables']['users']['Row']
type Post = Database['public']['Tables']['posts']['Row']

export type BlogPost = Post & { user: User | null }

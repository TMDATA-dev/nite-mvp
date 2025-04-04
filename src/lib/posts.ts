import { supabase } from './supabase';

export interface Post {
  id: string;
  title: string;
  platform: 'twitter' | 'instagram' | 'linkedin';
  post_date: Date;
  created_at?: Date;
  updated_at?: Date;
}

export async function createPost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to create posts');
  }

  // Create the post
  const { data, error } = await supabase
    .from('posts')
    .insert([{
      title: post.title,
      platform: post.platform,
      post_date: post.post_date.toISOString(),
      user_id: user.id
    }])
    .select()
    .single();

  if (error) {
    console.error('Error creating post:', error);
    throw error;
  }

  return data;
}

export async function getPosts() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to get posts');
  }

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', user.id)
    .order('post_date', { ascending: true });

  if (error) {
    console.error('Error getting posts:', error);
    throw error;
  }

  return data.map(post => ({
    ...post,
    post_date: new Date(post.post_date),
    created_at: new Date(post.created_at),
    updated_at: new Date(post.updated_at),
  }));
}

export async function updatePost(id: string, post: Partial<Omit<Post, 'id' | 'created_at' | 'updated_at'>>) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to update posts');
  }

  const { data, error } = await supabase
    .from('posts')
    .update({
      ...post,
      post_date: post.post_date?.toISOString(),
    })
    .eq('id', id)
    .eq('user_id', user.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating post:', error);
    throw error;
  }

  return data;
}

export async function deletePost(id: string) {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('User must be authenticated to delete posts');
  }

  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}
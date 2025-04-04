import { supabase } from './supabase';

interface InstagramTokens {
  access_token: string;
  user_id: string;
}

export async function connectInstagram() {
  const clientId = import.meta.env.VITE_INSTAGRAM_CLIENT_ID;
  const redirectUri = `${window.location.origin}/instagram/callback`;
  
  // Store the current URL to redirect back after auth
  sessionStorage.setItem('instagram_redirect', window.location.pathname);
  
  // Redirect to Instagram auth
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;
  window.location.href = authUrl;
}

export async function handleInstagramCallback(code: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Exchange code for access token
    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: import.meta.env.VITE_INSTAGRAM_CLIENT_ID,
        client_secret: import.meta.env.VITE_INSTAGRAM_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: `${window.location.origin}/instagram/callback`,
        code,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get Instagram access token');
    }

    const tokens: InstagramTokens = await response.json();

    // Store tokens in Supabase
    const { error } = await supabase
      .from('profiles')
      .update({
        instagram_token: tokens.access_token,
        instagram_user_id: tokens.user_id,
      })
      .eq('id', user.id);

    if (error) throw error;

    // Redirect back to the original page
    const redirectPath = sessionStorage.getItem('instagram_redirect') || '/dashboard';
    sessionStorage.removeItem('instagram_redirect');
    return redirectPath;

  } catch (error) {
    console.error('Instagram auth error:', error);
    throw error;
  }
}

export async function isInstagramConnected(): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('profiles')
    .select('instagram_token')
    .eq('id', user.id)
    .single();

  return Boolean(data?.instagram_token);
}
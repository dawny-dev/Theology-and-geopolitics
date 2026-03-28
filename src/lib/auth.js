import { supabase } from "./supabase";

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  return { user: data?.user, error };
}

export async function getAuthorProfile(userId) {
  const { data, error } = await supabase
    .from("authors")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
}

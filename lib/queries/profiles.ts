import { createClient } from "@/lib/supabase/server";
import { Profile } from "@/types/profile";

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("getProfile error:", error.message);
    return null;
  }

  return data as Profile;
}
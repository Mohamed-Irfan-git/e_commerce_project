import { createClient } from "@/lib/supabase/server";
import { Address } from "@/types/address";

export async function getAddresses(userId: string): Promise<Address[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("addresses")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAddresses error:", error.message);
    return [];
  }

  return data;
}

export async function addAddress(address: Partial<Address>) {
  const supabase = await createClient();

  const { error } = await supabase.from("addresses").insert(address);

  if (error) console.error(error.message);
}

export async function setDefaultAddress(userId: string, addressId: number) {
  const supabase = await createClient();

  // remove previous default
  await supabase
    .from("addresses")
    .update({ is_default: false })
    .eq("user_id", userId);

  // set new default
  await supabase
    .from("addresses")
    .update({ is_default: true })
    .eq("id", addressId);
}
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      full_name,
      phone,
      line1,
      line2,
      city,
      district,
      postal_code,
      country,
      is_default,
    } = await req.json();

    if (!full_name || !phone || !line1 || !city || !country) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (is_default) {
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", user.id);
    }

    const { error } = await supabase.from("addresses").insert({
      user_id: user.id,
      full_name,
      phone,
      line1,
      line2: line2 || null,
      city,
      district: district || null,
      postal_code: postal_code || null,
      country,
      is_default: !!is_default,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Create address error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      id,
      full_name,
      phone,
      line1,
      line2,
      city,
      district,
      postal_code,
      country,
      is_default,
    } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing address id" }, { status: 400 });
    }

    if (!full_name || !phone || !line1 || !city || !country) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (is_default) {
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", user.id);
    }

    const { error } = await supabase
      .from("addresses")
      .update({
        full_name,
        phone,
        line1,
        line2: line2 || null,
        city,
        district: district || null,
        postal_code: postal_code || null,
        country,
        is_default: !!is_default,
      })
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update address error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
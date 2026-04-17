import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, price, stock_qty } = await req.json();

    if (!name || price === undefined || stock_qty === undefined) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const slug = `${slugify(name)}-${Date.now()}`;

    const { error } = await supabase.from("products").insert({
      name,
      slug,
      price,
      stock_qty,
      is_active: true,
    });

    if (error) {
      console.error("Create product error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin product POST error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
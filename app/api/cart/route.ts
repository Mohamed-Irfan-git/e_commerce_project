import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { addToCart } from "@/lib/queries/cart";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    // get logged in user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Missing productId" },
        { status: 400 }
      );
    }

    await addToCart(user.id, productId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API cart error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
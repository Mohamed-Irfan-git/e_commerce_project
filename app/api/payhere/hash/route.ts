import { NextResponse } from "next/server";
import crypto from "crypto";
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

    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    const { data: order, error } = await supabase
      .from("orders")
      .select("id, total_amount, currency")
      .eq("id", Number(orderId))
      .eq("user_id", user.id)
      .single();

    if (error || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const merchantId = process.env.NEXT_PUBLIC_PAYHERE_MERCHANT_ID!;
    const merchantSecret = process.env.PAYHERE_SECRET!;

    const amount = Number(order.total_amount).toFixed(2);
    const currency = order.currency || "LKR";

    const hashedSecret = crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex")
      .toUpperCase();

    const hash = crypto
      .createHash("md5")
      .update(
        merchantId +
          String(order.id) +
          amount +
          currency +
          hashedSecret
      )
      .digest("hex")
      .toUpperCase();

    return NextResponse.json({
      hash,
      amount,
      currency,
    });
  } catch (error) {
    console.error("PayHere hash error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createOrder } from "@/lib/actions/checkout";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { addressId, paymentMethod } = await req.json();

    if (!addressId) {
      return NextResponse.json(
        { error: "Missing addressId" },
        { status: 400 }
      );
    }

    const order = await createOrder(
      user.id,
      Number(addressId),
      paymentMethod || "payhere"
    );

    if (!order) {
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      totalAmount: Number(order.total_amount),
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
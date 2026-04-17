import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const formData = await req.formData();

    const merchant_id = String(formData.get("merchant_id") || "");
    console.log()
    const order_id = String(formData.get("order_id") || "");
    const payhere_amount = String(formData.get("payhere_amount") || "");
    const payhere_currency = String(formData.get("payhere_currency") || "");
    const status_code = String(formData.get("status_code") || "");
    const md5sig = String(formData.get("md5sig") || "");
    const payment_id = String(formData.get("payment_id") || "");

 

    const merchantSecret = process.env.PAYHERE_SECRET || "";

    const hashedSecret = crypto
      .createHash("md5")
      .update(merchantSecret)
      .digest("hex")
      .toUpperCase();

    const localMd5Sig = crypto
      .createHash("md5")
      .update(
        merchant_id +
          order_id +
          payhere_amount +
          payhere_currency +
          status_code +
          hashedSecret
      )
      .digest("hex")
      .toUpperCase();



    if (localMd5Sig !== md5sig) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const numericOrderId = Number(order_id);

    console.log("merchant_id:", merchant_id);
    console.log("order_id:", order_id);
    console.log("status_code:", status_code);
    console.log("md5sig:", md5sig);
    console.log("localMd5Sig:", localMd5Sig);

    if (!numericOrderId) {
      return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
    }

    if (status_code === "2") {
      await supabase
        .from("orders")
        .update({
          payment_status: "paid",
          order_status: "confirmed",
        })
        .eq("id", numericOrderId);

      await supabase
        .from("payments")
        .update({
          status: "paid",
          provider_ref: payment_id || null,
          paid_at: new Date().toISOString(),
        })
        .eq("order_id", numericOrderId);
    } else if (status_code === "-1" || status_code === "-2") {
      await supabase
        .from("orders")
        .update({
          payment_status: "failed",
        })
        .eq("id", numericOrderId);

      await supabase
        .from("payments")
        .update({
          status: "failed",
          provider_ref: payment_id || null,
        })
        .eq("order_id", numericOrderId);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PayHere notify error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
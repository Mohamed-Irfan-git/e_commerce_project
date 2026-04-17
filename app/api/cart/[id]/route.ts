import { NextResponse } from "next/server";
import { removeFromCart, updateCartQuantity } from "@/lib/queries/cart";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(_: Request, { params }: Props) {
  try {
    const { id } = await params;
    const cartId = Number(id);

    if (!cartId) {
      return NextResponse.json({ error: "Invalid cart id" }, { status: 400 });
    }

    await removeFromCart(cartId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE cart item error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Props) {
  try {
    const { id } = await params;
    const cartId = Number(id);
    const { quantity } = await req.json();

    if (!cartId || !quantity) {
      return NextResponse.json(
        { error: "Invalid cart id or quantity" },
        { status: 400 }
      );
    }

    await updateCartQuantity(cartId, quantity);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PATCH cart item error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
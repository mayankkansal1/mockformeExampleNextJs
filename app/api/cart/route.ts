// app/api/cart/route.ts
import { NextResponse } from "next/server";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

// ✅ Mock Cart Data (based on your JSON)
let cart: CartItem[] = [
  {
    id: 1,
    name: "Nike Shoes",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1606813902914-9a6e53ce534d?w=600&q=80",
    quantity: 2,
  },
  {
    id: 2,
    name: "Adidas T-shirt",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    quantity: 1,
  },
  {
    id: 3,
    name: "Levi’s Jeans",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    quantity: 3,
  },
];

// ✅ GET /api/cart → fetch mock cart
export async function GET() {
  return NextResponse.json(cart);
}

// ✅ POST /api/cart → add product or increase quantity
export async function POST(req: Request) {
  const body = await req.json();
  const { id, name, price, image } = body;

  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }

  return NextResponse.json(cart);
}

// ✅ DELETE /api/cart?id=ID → decrease or remove product
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  const existing = cart.find((item) => item.id === id);
  if (!existing) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  if (existing.quantity > 1) {
    existing.quantity -= 1;
  } else {
    cart = cart.filter((item) => item.id !== id);
  }

  return NextResponse.json(cart);
}

// app/api/products/[id]/route.ts
import { NextResponse } from "next/server";

const products = [
  {
    id: 1,
    name: "Nike Shoes",
    price: 4999,
    image:
      "https://images.unsplash.com/photo-1606813902914-9a6e53ce534d?w=600&q=80",
    description: "High quality Nike running shoes.",
  },
  {
    id: 2,
    name: "Adidas T-shirt",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    description: "Comfortable cotton Adidas T-shirt.",
  },
  {
    id: 3,
    name: "Levi’s Jeans",
    price: 2999,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    description: "Classic Levi’s slim fit jeans.",
  },
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // ✅ await params

  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(product);
}

// app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { mockforme } from "mockforme";

mockforme(process.env.NEXT_PUBLIC_MOCKFORME_TOKEN ?? "").run((data) => {
  console.log(data, "data");
});
type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch cart from API
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/cart");
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error("Failed to load cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // ✅ Remove item (calls API then updates state)
  const removeFromCart = async (id: number) => {
    try {
      const res = await fetch(`/api/cart?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  if (loading) {
    return <main className="p-8">Loading cart...</main>;
  }

  if (cart.length === 0) {
    return <main className="p-8">Your cart is empty 🛒</main>;
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex items-center gap-4 mb-4 border p-2">
          <Image src={item.image} alt={item.name} width={80} height={80} />
          <div>
            <h2 className="font-semibold">{item.name}</h2>
            <p>
              ₹{item.price} × {item.quantity}
            </p>
          </div>
          <button
            className="ml-auto text-red-600"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <h2 className="text-xl font-bold mt-6">
        Total: ₹{cart.reduce((sum, i) => sum + i.price * i.quantity, 0)}
      </h2>
    </main>
  );
}

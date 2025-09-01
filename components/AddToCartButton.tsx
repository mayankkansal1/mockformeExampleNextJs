"use client";
import { useCart } from "./CartContext";

export default function AddToCartButton({ product }: { product: any }) {
  const { addToCart } = useCart();

  const handleAdd = async () => {
    try {
      // ✅ Call API to persist item
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: Number(product.id),
          name: product.name,
          price: Number(product.price),
          image: product.image,
        }),
      });

      const updatedCart = await res.json();

      // ✅ Update local context state
      addToCart({
        id: Number(product.id),
        name: product.name,
        price: Number(product.price),
        image: product.image,
      });

      console.log("Cart updated:", updatedCart);
    } catch (err) {
      console.error("Failed to add item:", err);
    }
  };

  return (
    <button
      onClick={handleAdd}
      className="mt-4 px-4 py-2 bg-black text-white rounded-lg"
    >
      Add to Cart
    </button>
  );
}

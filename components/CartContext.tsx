// context/CartContext.tsx
"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const normalizeCart = (items: CartItem[]): CartItem[] => {
    const idToItem = new Map<number, CartItem>();
    for (const raw of items) {
      const id = Number((raw as any).id);
      if (!Number.isFinite(id)) {
        continue;
      }
      const name = String((raw as any).name ?? "");
      const price = Number((raw as any).price ?? 0);
      const image = String((raw as any).image ?? "");
      const quantity = Math.max(1, Number((raw as any).quantity) || 0);

      const item: CartItem = { id, name, price, image, quantity };

      const existing = idToItem.get(id);
      if (existing) {
        idToItem.set(id, {
          ...existing,
          quantity: existing.quantity + quantity,
        });
      } else {
        idToItem.set(id, item);
      }
    }
    return Array.from(idToItem.values());
  };

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored =
        typeof window !== "undefined" ? localStorage.getItem("cart") : null;
      if (stored) {
        const parsed: CartItem[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCart(normalizeCart(parsed));
        }
      }
    } catch {
      // ignore corrupt storage
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    } catch {
      // storage may be unavailable
    }
  }, [cart]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((previous) => {
      const base = normalizeCart(previous);
      const id = Number((item as any).id);
      const name = String((item as any).name ?? "");
      const price = Number((item as any).price ?? 0);
      const image = String((item as any).image ?? "");

      const existing = base.find((i) => i.id === id);
      if (existing) {
        return base.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...base, { id, name, price, image, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((previousCartItems) => {
      const base = normalizeCart(previousCartItems);
      const targetItem = base.find((cartItem) => cartItem.id === id);
      if (!targetItem) return base;

      if (targetItem.quantity > 1) {
        return base.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      }

      // Quantity is 1: remove the item entirely
      return base.filter((cartItem) => cartItem.id !== id);
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};

import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; // ✅ await params first

  const res = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-store",
  });
  const product = await res.json();

  if (product.error) return <h1>Product not found</h1>;

  return (
    <div className="p-8">
      <Image src={product.image} alt={product.name} width={500} height={400} />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-4">₹{product.price}</p>
      <AddToCartButton product={product} />
    </div>
  );
}

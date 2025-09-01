import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product: any) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="border rounded-xl shadow p-4 hover:shadow-lg transition"
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="rounded-md"
            />
            <h2 className="mt-2 font-semibold">{product.name}</h2>
            <p className="text-gray-600">₹{product.price}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

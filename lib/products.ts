// lib/products.ts
export async function getProducts() {
  return [
    {
      id: 1,
      name: "Nike Shoes",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1606813902914-9a6e53ce534d?w=600&q=80",
    },
    {
      id: 2,
      name: "Adidas T-shirt",
      price: 1999,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80",
    },
    {
      id: 3,
      name: "Levi’s Jeans",
      price: 2999,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    },
  ];
}

# 🛍️ Next.js E-Commerce with MockForMe

This is a **Next.js demo project** that showcases how to build a simple **E-Commerce application** with:

- ✅ Product Listing API + Page
- ✅ Individual Product API + Page
- ✅ Cart API + Page
- ✅ Mocked backend using [MockForMe](https://mockforme.com/)

It demonstrates how developers can quickly prototype APIs and frontend pages **without needing a real backend**.

---

## 🚀 Features

- **Next.js 15 App Router** – modern file-based routing.
- **MockForMe API mocking** – fake but structured APIs for products and cart.
- **Dynamic Routing** – `/products/[id]` for product details.
- **Cart Management** – add/remove items from the cart with mocked API.
- **Server Components** – API integration directly inside Next.js pages.

---

## 📂 Project Structure

```bash
.
├── app
│   ├── api
│   │   ├── products          # Product list API
│   │   │   └── route.ts
│   │   ├── products/[id]     # Individual product API
│   │   │   └── route.ts
│   │   └── cart              # Cart API
│   │       └── route.ts
│   ├── products              # Products page
│   │   └── page.tsx
│   ├── products/[id]         # Individual product page
│   │   └── page.tsx
│   └── cart                  # Cart page
│       └── page.tsx
├── components                # UI components
├── package.json
└── README.md
```

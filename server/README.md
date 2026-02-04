# Website API (Express)

Endpoints:

- `GET /api/health` — health check
- `GET /api/products` — list products
- `GET /api/products/:id` — single product
- `GET /api/cart` — view cart (in-memory)
- `POST /api/cart` — add item to cart, body `{ productId, quantity }`
- `DELETE /api/cart/:id` — remove cart item by cart item id

Run locally:

```bash
cd server
npm install
npm start
```

The server runs on `http://localhost:5000` by default.

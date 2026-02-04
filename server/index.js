const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const products = [
  { id: 1, title: 'Minimal Lamp', price: 49.99, description: 'Simple desktop lamp.', image: 'https://images.pexels.com/photos/96381/pexels-photo-96381.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 2, title: 'Wooden Chair', price: 129.99, description: 'Comfortable wooden chair.', image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=300' },
  { id: 3, title: 'Ceramic Mug', price: 14.99, description: 'Handmade coffee mug.', image: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=300' }
];

const cart = [];

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

app.get('/api/cart', (req, res) => {
  res.json(cart);
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity = 1 } = req.body;
  const product = products.find(p => p.id === Number(productId));
  if (!product) return res.status(400).json({ error: 'Invalid productId' });
  const existing = cart.find(item => item.product.id === product.id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: Date.now(), product, quantity });
  }
  res.status(201).json(cart);
});

app.delete('/api/cart/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = cart.findIndex(item => item.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  cart.splice(idx, 1);
  res.json(cart);
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

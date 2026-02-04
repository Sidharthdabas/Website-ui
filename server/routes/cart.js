const express = require('express');
const router = express.Router();
const { cart, products } = require('../data');

// GET /api/cart
router.get('/', (req, res) => {
  res.json(cart);
});

// POST /api/cart  { productId, quantity }
router.post('/', (req, res) => {
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

// DELETE /api/cart/:id (remove cart item)
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = cart.findIndex(item => item.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Item not found' });
  cart.splice(idx, 1);
  res.json(cart);
});

module.exports = router;

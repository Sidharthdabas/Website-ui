import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero Section";
import ProductCard from "./Product Grid";
import Footer from "./Footer";

const API_URL = "http://localhost:5001/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_URL}/cart`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setCartCount(data.length);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 })
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setCartCount(data.length);
      alert("Added to cart!");
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert("Error adding to cart: " + err.message);
    }
  };

  return (
    <>
      <Navbar cartCount={cartCount} />
      <Hero />

      <section className="products">
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))
        )}
      </section>

      <Footer />
    </>
  );
}

export default Home;

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p style={{ fontWeight: 'bold' }}>${product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;

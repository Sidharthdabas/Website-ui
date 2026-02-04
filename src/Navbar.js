function Navbar({ cartCount = 0 }) {
  return (
    <nav className="navbar">
      <h2>Shop.</h2>
      <ul>
        <li>Home</li>
        <li>Products</li>
        <li>Cart ({cartCount})</li>
      </ul>
    </nav>
  );
}

export default Navbar;

import React from "react";
import ChatWidget from "./ChatWidget";
import "../styles/Content.css";

const products = [
  {
    id: 7,
    name: "Floral Cup",
    price: "$60.00 NZD",
    image: "product8.jpg",
  },
  {
    id: 8,
    name: "Floral Cup",
    price: "$63.00 NZD",
    image: "product10.jpg",
  },
];


function ProductCategory() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <p className="unauthenticated-message">User not authenticated. Please log in.</p>;
  }

  return (
    <div className="content-container">
      {/* Product Cards Section */}
      <div className="products-section">
        <h2 className="section-title">New Products</h2>
        <div className="products-container">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Widget */}
      <div className="chat-widget-container">
        <ChatWidget userId={userId} />
      </div>
    </div>
  );
}

export default ProductCategory;

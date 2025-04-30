import React from "react";
import ChatWidget from "./ChatWidget";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/Content.css";

const products = [
  {
    id: 1,
    name: "Modern Cup",
    price: "$70.00 NZD",
    image: "product1.jpg",
  },
  {
    id: 2,
    name: "Pure Color Cup",
    price: "$50.00 NZD",
    image: "product2.jpg",
  },
  {
    id: 3,
    name: "Floral Cup",
    price: "$60.00 NZD",
    image: "product4.jpg",
  },
  {
    id: 4,
    name: "Floral Cup",
    price: "$60.00 NZD",
    image: "product5.jpg",
  },
  {
    id: 5,
    name: "Floral Cup",
    price: "$60.00 NZD",
    image: "product6.jpg",
  },
  {
    id: 6,
    name: "Floral Cup",
    price: "$60.00 NZD",
    image: "product7.jpg",
  },
  {
    id: 7,
    name: "Floral Cup",
    price: "$60.00 NZD",
    image: "product8.jpg",
  },
  {
    id: 8,
    name: "Floral Cup",
    price: "$60.00 NZD",
    image: "product10.jpg",
  },
];

const bannerImages = [
  "/banner1.jpg",
  "/banner2.jpg",
  "/banner4.jpg",
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function Content() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    return <p className="unauthenticated-message">User not authenticated. Please log in.</p>;
  }

  return (
    <div className="content-container">
      {/* Banner Carousel */}
      <div className="carousel-container">
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          showDots={true}
          arrows={true}
        >
          {bannerImages.map((image, index) => (
            <img key={index} src={image} alt={`Banner ${index + 1}`} className="carousel-image" />
          ))}
        </Carousel>
      </div>

      {/* Product Cards Section */}
      <div className="products-section">
        <h2 className="section-title">Featured Products</h2>
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

export default Content;

import React from "react";
import Header from "../components/Header";
import ProductCategory from "../components/ProductCategory";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <ProductCategory />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;

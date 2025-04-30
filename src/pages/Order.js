import React from "react";
import Header from "../components/Header";
import OrderDetail from "../components/OrderDetail";
import Footer from "../components/Footer";

const Order = () => {
  return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Header />
        <div style={{ flex: 1, overflow: "auto" }}>
          <OrderDetail />
        </div>
        <Footer />
      </div>
  );
};

export default Order;

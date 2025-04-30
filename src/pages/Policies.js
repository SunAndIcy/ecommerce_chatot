import React from "react";
import Header from "../components/Header";
import PoliciesContent from "../components/PoliciesContent";
import Footer from "../components/Footer";

const Policies = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div style={{ flex: 1, overflow: "auto" }}>
        <PoliciesContent />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Policies;

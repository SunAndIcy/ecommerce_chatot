import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Order from "./pages/Order";
import Category from "./pages/Category";
import Policies from "./pages/Policies";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/new-product" element={<Category />} />
        <Route path="/policies" element={<Policies />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;



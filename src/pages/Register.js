import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 用于提交按钮的加载状态

  const navigate = useNavigate(); // 初始化 navigate

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true); // 开始加载状态
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.text(); // 假设后端返回纯文本
      if (response.ok) {
        alert("Registration successful!");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      } else {
        alert(result || "Registration failed!");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // 停止加载状态
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Create an Account</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <label htmlFor="email" className="register-label">
          Email *
        </label>
        <input
          id="email"
          type="email"
          className="register-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="register-label">
          Password *
        </label>
        <input
          id="password"
          type="password"
          className="register-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6} // 密码最小长度限制
          required
        />

        <label htmlFor="confirmPassword" className="register-label">
          Confirm Password *
        </label>
        <input
          id="confirmPassword"
          type="password"
          className="register-input"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button type="submit" className="register-button" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Register;

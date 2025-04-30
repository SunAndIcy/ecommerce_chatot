import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 用于路由跳转
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState(""); // 存储用户输入的邮箱
  const [password, setPassword] = useState(""); // 存储用户输入的密码
  const [isLoading, setIsLoading] = useState(false); // 是否加载中
  const navigate = useNavigate(); // 初始化 useNavigate

  const handleLogin = async (e) => {
    e.preventDefault(); // 阻止表单默认行为

    setIsLoading(true); // 设置加载状态
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json(); // 假设后端返回 JSON 格式的数据

      console.log("data is" , data);

      if (response.ok) {
        alert("Login successful!");
        // 将用户信息存储到 localStorage
        localStorage.setItem("userId", data.data); // 存储用户 ID
        // 跳转到首页
        navigate("/");
      } else {
        // 显示后端返回的错误信息
        alert(data.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false); // 结束加载状态
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email" className="login-label">EMAIL</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className="login-label">PASSWORD</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="login-button"
          disabled={isLoading} // 禁用按钮避免重复提交
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>

        <div className="login-links">
          <a href="/forgot-password" className="forgot-password">
            Forgot your password?
          </a>
          <a href="/register" className="create-account">
            Create account
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;

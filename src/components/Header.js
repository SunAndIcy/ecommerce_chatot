import React, { useState, useEffect } from "react";
import "../styles/Header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearch = () => {
    console.log("Search initiated");
    // 在这里添加搜索逻辑
  };

  useEffect(() => {
    // 初始化检查 localStorage 是否有 userId
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId); // 如果存在 userId，则设置为 true
  }, []);

  const handleIconClick = () => {
    if (isLoggedIn) {
      // 用户已登录，点击图标后登出
      localStorage.removeItem("userId");
      setIsLoggedIn(false); // 更新登录状态
      alert("You have logged out.");
    } else {
      // 用户未登录，跳转到登录页面
      window.location.href = "/login"; // 替换为实际的登录页面路径
    }
  };

  return (
    <header className="header">
      {/* 搜索框 */}
      <div className="header-search">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
        />
        <img
          src="/search.png" // 替换为你的搜索图标路径
          alt="Search"
          className="search-icon-inside"
          onClick={handleSearch}
        />
      </div>

      {/* 登录图标 */}
      {/* <div className="header-links">
        <img
          src="/login.png" // 替换为你的登录图标路径
          alt="Login"
          className="login-icon"
          onClick={handleLoginClick}
        />
      </div> */}
      {/* 登录图标 */}
      <div className="header-links">
        <img
          src="/login.png" // 替换为你的登录图标路径
          alt="Login"
          className="login-icon"
          onClick={handleIconClick}
        />
        {isLoggedIn && <span className="logout-text">Logout</span>}
      </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 获取 URL 参数
import "../styles/OrderDetail.css";

const OrderDetails = () => {
  const { orderId } = useParams(); // 获取 URL 参数中的 orderId
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) return; // 如果没有 orderId，退出请求

    console.log("Fetching order details for:", orderId);

    const fetchOrderDetails = async () => {
      try {
        setLoading(true); // 开始加载
        setError(null); // 清空错误信息

        const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
          method: "GET",
          headers: {
            "Cache-Control": "no-cache", // 禁用缓存
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch order details. Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.code === 200) {
          console.log("Order details received:", result.data);
          setOrder(result.data); // 设置订单数据
        } else {
          throw new Error(result.message || "Unknown error occurred");
        }
      } catch (err) {
        console.error("Error fetching order details:", err);
        setError(err.message);
      } finally {
        setLoading(false); // 加载结束
      }
    };

    fetchOrderDetails();
  }, [orderId]); // 在 orderId 变化时重新请求

  // 渲染加载状态
  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  // 渲染错误信息
  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  // 渲染无数据的情况
  if (!order) {
    return <p className="loading">No order data found.</p>;
  }

  // 渲染订单详情页面
  return (
    <div className="order-details-container">
      <h1 className="order-details-title">Account</h1>
      <a href="/account" className="order-details-return">
        Return to Account details
      </a>

      <div className="order-details-content">
        <h2 className="order-id">Order {order.orderId}</h2>
        <p className="order-date">Placed on {order.placedDate}</p>

        <div className="order-grid">
          {/* 订单表格 */}
          <div className="order-table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.sku}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>${item.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="text-right">Subtotal</td>
                  <td>${order.subtotal.toFixed(2)}</td>
                </tr>
                <tr>
                  <td colSpan="4" className="text-right">Shipping (Standard)</td>
                  <td>${order.shipping.toFixed(2)}</td>
                </tr>
                <tr className="order-total-row">
                  <td colSpan="4" className="text-right">Total</td>
                  <td>${order.total.toFixed(2)} NZD</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* 地址信息 */}
          <div className="order-address">
            <div className="billing-address">
              <h3>Billing Address</h3>
              <p>Payment Status: {order.billingAddress.status}</p>
              <p>{order.billingAddress.name}</p>
              <p>{order.billingAddress.address}</p>
              <p>
                {order.billingAddress.city}, {order.billingAddress.postalCode}
              </p>
              <p>{order.country}</p>
            </div>
            <div className="shipping-address">
              <h3>Shipping Address</h3>
              <p>Fulfillment Status: {order.shippingAddress.status}</p>
              <p>{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

import React, { useState } from "react";
import "../styles/Policies.css";

const policies = [
  { id: "returns", title: "Returns & Refunds", content: "You can return items within 30 days of purchase. The item must be unused and in its original packaging. Refunds will be processed within 7 business days after receiving the returned item. Return shipping costs are covered by the customer unless the product is defective or incorrect." },
  { id: "shipping", title: "Shipping & Delivery", content: "We ship worldwide. Standard shipping takes 5-7 business days, while express shipping takes 1-3 business days. Orders are processed within 1-2 business days. Free shipping is available for orders over $50." },
  { id: "payment", title: "Payments & Orders", content: "We accept Visa, MasterCard, PayPal, and Afterpay. Your payment information is securely processed. You can modify or cancel your order before it is shipped." },
  { id: "warranty", title: "Warranty & Support", content: "We offer a 6-month warranty covering manufacturing defects. If your product is defective, please contact our support team for a replacement or repair. Warranty does not cover accidental damage." },
  { id: "customer-support", title: "Customer Support", content: "You can contact our support team via email at support@example.com or live chat. Our customer service hours are Monday to Friday, 9 AM - 5 PM (UTC)." },
];

const Policies = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(policies[0].id);

  return (
    <div className="policies-container">
      {/* 侧边导航栏 */}
      <nav className="policies-sidebar">
        <ul>
          {policies.map((policy) => (
            <li 
              key={policy.id} 
              className={selectedPolicy === policy.id ? "active" : ""}
              onClick={() => setSelectedPolicy(policy.id)}
            >
              {policy.title}
            </li>
          ))}
        </ul>
      </nav>

      {/* 内容区域 */}
      <div className="policies-content">
        {policies.map((policy) => (
          selectedPolicy === policy.id && (
            <div key={policy.id}>
              <h2>{policy.title}</h2>
              <p>{policy.content}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Policies;

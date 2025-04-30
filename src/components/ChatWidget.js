import React, { useState, useEffect } from "react";
import "../styles/ChatWidget.css";

const ChatWidget = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const toggleChat = () => setIsOpen((prevState) => !prevState);

  useEffect(() => {
    if (userId) {
      const ws = new WebSocket(`ws://localhost:8080/chat?userId=${userId}`);
      setSocket(ws);

      ws.onopen = () => console.log(`WebSocket connected for userId: ${userId}`);
      ws.onmessage = (event) => {
        try {
          const receivedMessage = JSON.parse(event.data);
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: receivedMessage.message },
          ]);
        } catch (error) {
          console.error("Failed to parse WebSocket message", error);
        }
      };

      ws.onclose = () => console.log("WebSocket disconnected");
      ws.onerror = (error) => console.error("WebSocket error", error);

      return () => ws.close();
    }
  }, [userId]);

  useEffect(() => {
    if (isOpen && userId) {
      fetch(`http://localhost:8080/chat/history?userId=${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch chat history");
          }
          return response.json();
        })
        .then((result) => {
          if (result.code === 200) {
            const chatData = result.data.map((msg) => ({
              sender: msg.fromId === Number(userId) ? "user" : "bot",
              text: msg.content,
            }));
            setMessages(chatData);
          } else {
            console.error("Error fetching chat history:", result.message);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [isOpen, userId]);

  const sendMessage = () => {
    if (socket && message.trim()) {
      const userMessage = { sender: "user", text: message, type: "text" };
      socket.send(JSON.stringify(userMessage));
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage("");
    }
  };

  return (
    <div className="chat-widget">
      {!isOpen && (
        <button className="chat-button" onClick={toggleChat}>
          <span>💬 Chat</span>
        </button>
      )}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h4>Chat with us</h4>
            <span
              style={{
                color: socket?.readyState === 1 ? "green" : "red",
                fontSize: "12px",
              }}
            >
              {socket?.readyState === 1 ? "Connected" : "Disconnected"}
            </span>
            <button className="close-button" onClick={toggleChat}>
              ✖
            </button>
          </div>
          <div className="chat-body">
          <div className="chat-messages">
            {messages.map((msg, index) => {
              const highlightedText = msg.text.replace(
                /(https?:\/\/[^\s]+)/g, // 正则匹配 URL
                '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">$1</a>'
              );

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: msg.sender === "user" ? "flex-start" : "flex-end",
                    marginBottom: "10px",
                  }}
                >
                  {msg.sender === "user" && (
                    <img
                      src="/user.png"
                      alt="User Icon"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "8px",
                      }}
                    />
                  )}
                  <span
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                      backgroundColor: msg.sender === "user" ? "#d4f4dd" : "#f4f4f4",
                      maxWidth: "60%",
                      wordWrap: "break-word",
                    }}
                    dangerouslySetInnerHTML={{ __html: highlightedText }} // 使用 HTML 解析
                  />
                  {msg.sender === "bot" && (
                    <img
                      src="/bot.png"
                      alt="Bot Icon"
                      style={{
                        width: "30px",
                        height: "30px",
                        marginLeft: "8px",
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Write message..."
              className="chat-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

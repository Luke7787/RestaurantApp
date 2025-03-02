import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    { id: 101, price: "$4.99" },
    { id: 166, price: "$5.44" },
    { id: 202, price: "$7.89" },
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleReceivePayment = () => {
    setCurrentPage("selectOrder");
  };

  const handleOrderSelection = (order) => {
    setSelectedOrder(order);
    setCurrentPage("payment");
  };

  const handlePayment = () => {
    setCurrentPage("success");
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="login-box">
          <h1>Welcome</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input type="password" placeholder="Password" />
          <button onClick={handleLogin}>Enter</button>
        </div>
      ) : currentPage === "dashboard" ? (
        <div className="dashboard">
          <h1>Hello, {username || "Guest"}!</h1>
          <p className="overview-text">Here is your quick business overview.</p>
          <div className="button-group">
            <button>Current Orders</button>
            <button onClick={handleReceivePayment}>Receive Payment</button>
            <button>Promotional Campaigns</button>
          </div>
        </div>
      ) : currentPage === "selectOrder" ? (
        <div className="dashboard">
          <h1>Receive Payment</h1>
          <p className="overview-text">Select Order Number</p>
          {orders.map((order) => (
            <button key={order.id} onClick={() => handleOrderSelection(order)}>
              Order #{order.id}
            </button>
          ))}
        </div>
      ) : currentPage === "payment" ? (
        <div className="dashboard">
          <h1>Payment #{selectedOrder.id}</h1>
          <p className="overview-text">Total: {selectedOrder.price}</p>
          <button onClick={handlePayment} className="tap-to-pay">Tap to Pay</button>
        </div>
      ) : (
        <div className="dashboard">
          <h1>Payment Success</h1>
          <p className="checkmark">✔</p>
        </div>
      )}
    </div>
  );
}

export default App;

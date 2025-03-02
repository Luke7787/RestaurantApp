import React, { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [campaignName, setCampaignName] = useState("");
  const [durationStart, setDurationStart] = useState("");
  const [durationEnd, setDurationEnd] = useState("");
  const [description, setDescription] = useState("");
  const [promotionCreated, setPromotionCreated] = useState(false);

  const orders = [
    { id: 101, items: ["Taco", "Soda"], total: "$4.99" },
    { id: 166, items: ["Burrito", "Lemonade"], total: "$5.44" },
    { id: 202, items: ["Quesadilla", "Iced Tea"], total: "$7.89" }
  ];

  const handleLogin = () => setIsLoggedIn(true);

  const handleReceivePayment = () => setCurrentPage("selectOrder");

  const handleOrderSelection = (order) => {
    setSelectedOrder(order);
    setCurrentPage("payment");
  };

  const handlePayment = () => setCurrentPage("success");

  const handleGoBackToDashboard = () => {
    setCurrentPage("dashboard");
    setSelectedOrder(null);
  };

  const handleGoToPromotions = () => setCurrentPage("promotions");
  const handleCreatePromotionPage = () => setCurrentPage("createPromotion");
  const handleCreatePromotion = () => {
    setPromotionCreated(true);
    setCurrentPage("promotionSuccess");
  };

  return (
    <div className="container">
      {!isLoggedIn ? (
        <div className="login-box">
          <h1>Welcome</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
            <button onClick={handleGoToPromotions}>Promotional Campaigns</button>
          </div>
        </div>
      ) : currentPage === "promotions" ? (
        <div className="dashboard">
          <h1>Promotional Campaigns</h1>
          <p className="overview-text">Ongoing Promotions</p>
          {!promotionCreated && <p className="no-promotions">There are currently no campaigns.</p>}
          <button onClick={handleCreatePromotionPage}>+ New Promotion</button>
        </div>
      ) : currentPage === "createPromotion" ? (
        <div className="dashboard">
          <h1>Create New Promotion</h1>
          <input type="text" placeholder="Campaign Name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
          <input type="date" value={durationStart} onChange={(e) => setDurationStart(e.target.value)} />
          <input type="date" value={durationEnd} onChange={(e) => setDurationEnd(e.target.value)} />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <button onClick={handleCreatePromotion}>Create</button>
        </div>
      ) : currentPage === "promotionSuccess" ? (
        <div className="dashboard">
          <h1>Promotion Created!</h1>
          <button onClick={handleGoBackToDashboard}>Back to Homepage</button>
        </div>
      ) : currentPage === "selectOrder" ? (
        <div className="dashboard">
          <h1>Receive Payment</h1>
          <p className="overview-text">Select Order</p>
          {orders.map((order) => (
            <button key={order.id} onClick={() => handleOrderSelection(order)}>
              Order #{order.id}
            </button>
          ))}
        </div>
      ) : currentPage === "payment" ? (
        <div className="dashboard">
          <h1>Payment #{selectedOrder.id}</h1>
          <ul className="order-items">
            {selectedOrder.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h2 className="total-price">Total: {selectedOrder.total}</h2>
          <button onClick={handlePayment} className="tap-to-pay">Tap to Pay</button>
        </div>
      ) : (
        <div className="dashboard">
          <h1>Payment Success</h1>
          <p className="checkmark">✔</p>
          <button onClick={handleGoBackToDashboard}>Back to Dashboard</button>
        </div>
      )}
    </div>
  );
}

export default App;

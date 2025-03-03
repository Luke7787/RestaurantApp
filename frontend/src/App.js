import React, { useState } from "react";
import "./App.css";

function App() {
  const [campaigns, setCampaigns] = useState([]);
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
    { id: 101, customer: "John Doe", items: ["Taco x2 - $3.44", "Drinks x2 - $1.44", "Tax - $0.50"], total: "$5.38" },
    { id: 166, customer: "Jane Smith", items: ["Burrito - $4.99", "Lemonade - $1.50", "Tax - $0.50"], total: "$6.99" },
    { id: 202, customer: "Mike Brown", items: ["Quesadilla - $6.89", "Iced Tea - $1.00", "Tax - $0.60"], total: "$8.49" }
  ];

  const handleLogin = () => setIsLoggedIn(true);
  const handleReceivePayment = () => setCurrentPage("selectOrder");
  const handleOrderSelection = (order) => {
    setSelectedOrder(order);
    setCurrentPage("payment");
  };
  const handlePayment = () => setCurrentPage("success");
  const handleGoBackToDashboard = () => setCurrentPage("dashboard");
  const handleGoToPromotions = () => setCurrentPage("promotions");
  const handleCreatePromotionPage = () => setCurrentPage("createPromotion");
  const handleCreatePromotion = () => {
    if (!campaignName || !durationStart || !durationEnd || !description) {
      alert("Please fill in all fields before creating a promotion.");
      return;
    }
  
    const newCampaign = {
      id: campaigns.length + 1, // Unique ID
      name: campaignName,
      start: durationStart,
      end: durationEnd,
      description: description,
    };
  
    setCampaigns([...campaigns, newCampaign]);
    setCampaignName(""); // Reset fields
    setDurationStart("");
    setDurationEnd("");
    setDescription("");
    
    // Show the success page first
    setCurrentPage("promotionSuccess");
  
    // Then, redirect to promotions after 2 seconds
    setTimeout(() => {
      setCurrentPage("promotions");
    }, 2000);
  };
  
  const handleGoToOrders = () => setCurrentPage("orders");
  const handleSelectNewOrder = (order) => {
    setSelectedOrder(order);
    setCurrentPage("orderDetails");
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
            <button onClick={handleGoToOrders}>Current Orders</button>
            <button onClick={handleReceivePayment}>Receive Payment</button>
            <button onClick={handleGoToPromotions}>Promotional Campaigns</button>
          </div>
        </div>
      ) : currentPage === "orders" ? (
        <div className="dashboard">
          <h1>Orders</h1>
          {orders.map((order) => (
            <button key={order.id} onClick={() => handleSelectNewOrder(order)}>
              Order #{order.id} - {order.customer}
            </button>
          ))}
          <p className="section-header">Finished Orders</p>
          <button onClick={handleGoBackToDashboard}>Back to Homepage</button>
        </div>
      ) : currentPage === "orderDetails" ? (
        <div className="dashboard">
          <h1>Order #{selectedOrder.id}</h1>
          <p>Customer: {selectedOrder.customer}</p>
          <ul className="order-items">
            {selectedOrder.items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h2 className="total-price">Total: {selectedOrder.total}</h2>
          <p>Pick up in 15 mins</p>
          <div className="checkbox-container">
            <label htmlFor="progress">Mark as In Progress</label>
            <input type="checkbox" id="progress" />
          </div>
          <div className="checkbox-container">
            <label htmlFor="complete">Mark as Complete</label>
            <input type="checkbox" id="complete" />
          </div>
          <button onClick={() => setCurrentPage("orders")}>Back to Orders</button>
        </div>
      ) : currentPage === "promotions" ? (
        <div className="dashboard">
          <h1>Promotional Campaigns</h1>
          <p className="overview-text">Ongoing Promotions</p>
          {campaigns.length === 0 ? (
            <p className="no-promotions">There are currently no campaigns.</p>
          ) : (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="campaign-box">
                <h1>{campaign.name}</h1>
                <p>{campaign.description}</p>
                <p>
                <strong>Duration:</strong> {new Date(campaign.start).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} 
{" to "} 
{new Date(campaign.end).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </p>
              </div>
            ))
          )}
          <button onClick={handleCreatePromotionPage}>+ New Promotion</button>
          <button onClick={handleGoBackToDashboard}>Back to Homepage</button>
        </div>
      ) : currentPage === "createPromotion" ? (
        <div className="dashboard">
          <h1>Create New Promotion</h1>
          <input type="text" placeholder="Campaign Name" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
          <input type="date" value={durationStart} onChange={(e) => setDurationStart(e.target.value)} />
          <input type="date" value={durationEnd} onChange={(e) => setDurationEnd(e.target.value)} />
          <textarea 
            className="description-textarea" 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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
          <button onClick={handleGoBackToDashboard}>Back to Homepage</button>
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
          <span className="checkmark">✔</span>
          <button onClick={handleGoBackToDashboard}>Back to Dashboard</button>
        </div>
      )}
    </div>
  );
}

export default App;

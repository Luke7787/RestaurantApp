import React, { useState } from "react";
import "./App.css";

function App() {
  const [campaigns, setCampaigns] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [campaignName, setCampaignName] = useState("");
  const [durationStart, setDurationStart] = useState("");
  const [durationEnd, setDurationEnd] = useState("");
  const [description, setDescription] = useState("");
  const [dateError, setDateError] = useState("");

  const [orders, setOrders] = useState([
    { id: 101, customer: "John Doe", items: ["Taco x2 - $3.44", "Drinks x2 - $1.44", "Tax - $0.50"], total: "$5.38", status: "new" },
    { id: 166, customer: "Jane Smith", items: ["Burrito - $4.99", "Lemonade - $1.50", "Tax - $0.50"], total: "$6.99", status: "new" },
    { id: 202, customer: "Mike Brown", items: ["Quesadilla - $6.89", "Iced Tea - $1.00", "Tax - $0.60"], total: "$8.49", status: "new" }
  ]);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setLoginError("Username and password are required");
      return;
    }
    setLoginError("");
    setIsLoggedIn(true);
  };

  const handleReceivePayment = () => setCurrentPage("selectOrder");
  const handleOrderSelection = (order) => {
    setSelectedOrder(order);
    setCurrentPage("payment");
  };
  
  const handlePayment = () => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== selectedOrder.id)); 
    setCurrentPage("success");
  };  
  
  const handleGoBackToDashboard = () => setCurrentPage("dashboard");
  const handleGoToPromotions = () => setCurrentPage("promotions");
  const handleCreatePromotionPage = () => setCurrentPage("createPromotion");
  
  const handleCreatePromotion = () => {
    
    setDateError("");

    
    if (!campaignName || !durationStart || !durationEnd || !description) {
      alert("Please fill in all fields before creating a promotion.");
      return;
    }
    
    
    const startDate = new Date(durationStart);
    const endDate = new Date(durationEnd);
    
    if (endDate <= startDate) {
      setDateError("End date must be after the start date");
      return;
    }
  
    const newCampaign = {
      id: campaigns.length + 1, 
      name: campaignName,
      start: durationStart,
      end: durationEnd,
      description: description,
    };
  
    setCampaigns([...campaigns, newCampaign]);
    setCampaignName(""); 
    setDurationStart("");
    setDurationEnd("");
    setDescription("");
    
    
    setCurrentPage("promotionSuccess");
  
    
    setTimeout(() => {
      setCurrentPage("promotions");
    }, 2000);
  };
  
  const handleGoToOrders = () => setCurrentPage("orders");
  
  const handleSelectNewOrder = (order) => {
    setSelectedOrder(order);
    setCurrentPage("orderDetails");
  };

  const handleOrderStatusChange = (orderId, status, checked) => {
    if (checked) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: status } : order
      ));
    }
  };

  const handleGoBack = (page) => {
    setCurrentPage(page);
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
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {loginError && <p className="error-message">{loginError}</p>}
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
            {order.customer} - Order #{order.id} {order.status !== "new" ? `(${order.status})` : ""}
          </button>
          ))}
          <p className="section-header">Finished Orders</p>
          <button onClick={handleGoBackToDashboard}>Back to Homepage</button>
        </div>
      ) : currentPage === "orderDetails" ? (
        <div className="dashboard">
          <div className="order-card">
            <h1>Order #{selectedOrder.id}</h1>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            
            <div className="order-items-box">
              <h1>Items:</h1>
              <ul className="order-items">
                {selectedOrder.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
      
            <h2 className="total-price">Total: {selectedOrder.total}</h2>
            <p className="pickup-info">📍 Pick up in <strong>15 mins</strong></p>
      
            <div className="checkbox-container">
              <label htmlFor="progress">Mark as In Progress</label>
              <input 
                type="checkbox" 
                id="progress" 
                checked={selectedOrder.status === "in progress"}
                onChange={(e) => {
                  if (e.target.checked) {
                    
                    handleOrderStatusChange(selectedOrder.id, "in progress", true);
                  } else {
                    
                    handleOrderStatusChange(selectedOrder.id, "new", true);
                  }
                }} 
              />
            </div>
            <div className="checkbox-container">
              <label htmlFor="complete">Mark as Complete</label>
              <input 
                type="checkbox" 
                id="complete" 
                checked={selectedOrder.status === "complete"}
                onChange={(e) => {
                  if (e.target.checked) {
                    
                    handleOrderStatusChange(selectedOrder.id, "complete", true);
                  } else {
                    
                    handleOrderStatusChange(selectedOrder.id, "new", true);
                  }
                }}
              />
            </div>
      
            <button onClick={() => setCurrentPage("orders")} className="back-button">Back to Orders</button>
          </div>
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
          <input 
            type="text" 
            placeholder="Campaign Name" 
            value={campaignName} 
            onChange={(e) => setCampaignName(e.target.value)} 
          />
          <label>Start Date:</label>
          <input 
            type="date" 
            value={durationStart} 
            onChange={(e) => setDurationStart(e.target.value)} 
          />
          <label>End Date:</label>
          <input 
            type="date" 
            value={durationEnd} 
            onChange={(e) => setDurationEnd(e.target.value)} 
          />
          {dateError && <p className="error-message">{dateError}</p>}
          <textarea 
            className="description-textarea" 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button onClick={handleCreatePromotion}>Create</button>
          <button onClick={() => handleGoBack("promotions")}>Back to Promotions</button>
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
              {order.customer} - Order #{order.id}
            </button>
          ))}
          <button onClick={handleGoBackToDashboard}>Back to Homepage</button>
        </div>
      ) : currentPage === "payment" ? (
        <div className="dashboard">
        <div className="payment-card">
          <h1>💳 Payment for {selectedOrder.customer}</h1>
          <h1>Order #{selectedOrder.id}</h1>

          <div className="order-items-box">
            <h1>Items:</h1>
            <ul className="order-items">
              {selectedOrder.items.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <h2 className="total-price">Total: {selectedOrder.total}</h2>

          <button onClick={handlePayment} className="tap-to-pay">Tap to Pay</button>
          <button onClick={() => handleGoBack("selectOrder")} className="back-button">Back to Order Selection</button>
        </div>
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
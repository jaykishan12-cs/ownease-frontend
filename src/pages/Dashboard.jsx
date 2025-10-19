import React, { useState } from "react";
import AddCustomer from "./AddCustomer";
// import CustomerList from "./CustomerList";
import SearchCustomer from "./SearchCustomer";
import DueCustomer from "./DueCustomer";
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all"); // default: see all customers

  const navigate = useNavigate();
  const handleViewAllCustomers = () => {
    navigate('/customers');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");  
    localStorage.removeItem("user"); 
    navigate('/');
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="container mt-5 d-flex flex-column align-items-center position-relative">
        {/* Logout button positioned top-right */}
        <button 
          className="btn btn-danger position-absolute" 
          style={{ top: 20, right: 20 }} 
          onClick={handleLogout}
        >
          Logout
        </button>

        <h2 className="mb-3">Owner Dashboard</h2>
        <div className="d-flex gap-3 mb-3">
          <button className="btn btn-primary" onClick={() => setActiveTab("add")}>
            Add Customer
          </button>
          <button className="btn btn-secondary" onClick={handleViewAllCustomers}>
            See All Customers
          </button>
          <button className="btn btn-info" onClick={() => setActiveTab("search")}>
            Search Customer
          </button>
          <button className="btn btn-warning" onClick={() => setActiveTab("due")}>
            Customers by Due
          </button>
        </div>

        <div className="main-content">
          {activeTab === "add" && <AddCustomer />}
          {activeTab === "search" && <SearchCustomer />}
          {activeTab === "due" && <DueCustomer />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

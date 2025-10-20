import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

//accessing the api
const url = process.env.VITE_API_URL;


const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleString("default", { month: "short", year: "numeric" });
};

const CustomerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${url}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch customer");
        const data = await res.json();
        setCustomer(data.customer || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [id]);

  if (loading) return <div className="text-center mt-4">Loading details...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (!customer) return <div className="mt-4">Customer not found.</div>;

  // ... inside your `return` JSX, place Delete Customer button here, outside amcHistory map:

return (
  <div className="container mt-4">
    <button className="btn btn-secondary mb-3" onClick={() => navigate("/customers")}>
      &larr; Back to All Customers
    </button>

    <h2>{customer.name}</h2>
    <p><strong>Phone:</strong> {customer.phone}</p>
    <p><strong>Address:</strong> {customer.address}</p>
    <p><strong>City:</strong> {customer.city}</p>
    <p><strong>Model Name:</strong> {customer.modelName}</p>

    <h4>AMC Details</h4>
    {customer.amcHistory?.length ? (
      customer.amcHistory.map((amc, idx) => (
        <div key={idx} className="card mb-3 p-3 shadow-sm">
          <p><strong>Start Date:</strong> {formatDate(amc.startDate)}</p>
          <p><strong>End Date:</strong> {formatDate(amc.endDate)}</p>
          <p><strong>AMC Amount:</strong> ₹{amc.amcAmount}</p>
          <p><strong>Status:</strong> {amc.status}</p>
          <p><strong>Service 1:</strong> {formatDate(amc.serviceDates?.[0])}</p>
          <p><strong>Service 2:</strong> {formatDate(amc.serviceDates?.[1])}</p>
          <p><strong>Service 3:</strong> {formatDate(amc.serviceDates?.[2])}</p>
        </div>
      ))
    ) : (
      <p>No AMC history found.</p>
    )}

    <div className="d-flex mt-3 mb-5">
      <button className="btn btn-success me-2">Add AMC</button>
      <button
        className="btn btn-danger"
        onClick={async () => {
          if (window.confirm("Are you sure you want to delete this customer?")) {
            try {
              const token = localStorage.getItem("token");
              const res = await fetch("https://ownease.onrender.com/${customer._id}", {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              if (!res.ok) throw new Error("Failed to delete customer");
              alert("Customer deleted successfully");
              navigate("/customers");
            } catch (err) {
              alert(err.message || "Error deleting customer");
            }
          }
        }}
      >
        Delete Customer
      </button>
    </div>
  </div>
);

};

export default CustomerDetails;

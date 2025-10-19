import React, { useState } from "react";

//accessing the api
const url = process.env.REACT_APP_API_URL;

const SearchCustomer = () => {
  const [query, setQuery] = useState("");
  const [customer, setCustomer] = useState(null); // Can be array or single object
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setCustomer(null);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${url}/search?query=${encodeURIComponent(query)}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok || !data.customers || data.customers.length === 0) {
        throw new Error(data.message || "Customer not found");
      }

      if (data.customers.length === 1) {
        setCustomer(data.customers[0]); // Single customer details
      } else {
        setCustomer(data.customers); // Multiple customers list
      }
    } catch (err) {
      setError(err.message || "Error searching customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter search query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
        </div>
        <button className="btn btn-dark w-100" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {Array.isArray(customer) ? (
        <>
          <h5 className="mt-4">Search Results:</h5>
          {customer.map((c) => (
            <div key={c._id} className="card p-3 mb-2">
              <strong>{c.name}</strong> | {c.phone} | {c.city} | {c.modelName}
            </div>
          ))}
        </>
      ) : customer ? (
        <div className="card mt-4 p-3">
          <h4>{customer.name}</h4>
          <p><strong>Phone:</strong> {customer.phone}</p>
          <p><strong>Address:</strong> {customer.address}</p>
          <p><strong>City:</strong> {customer.city}</p>
          <p><strong>Model Name:</strong> {customer.modelName}</p>
          <h5>AMC Details</h5>
          {customer.amcHistory?.length ? (
            customer.amcHistory.map((amc, idx) => (
              <div key={idx} className="mb-3 border-bottom pb-2">
                <p><strong>Start Date:</strong> {new Date(amc.startDate).toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {new Date(amc.endDate).toLocaleDateString()}</p>
                <p><strong>AMC Amount:</strong> ₹{amc.amcAmount}</p>
                <p><strong>Status:</strong> {amc.status}</p>
                {amc.serviceDates?.map((srv, i) => (
                  <p key={i}><strong>Service {i + 1}:</strong> {new Date(srv).toLocaleDateString()}</p>
                ))}
              </div>
            ))
          ) : (
            <p>No AMC history found.</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default SearchCustomer;

import React, { useState } from "react";


const AddCustomer = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    modelName: "",
    amcStartDate: "",
    amcEndDate: "",
    amcAmount: "",      
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");
  setSuccess("");

  // Prepare data with nested amcHistory array
  const customerData = {
    name: formData.name,
    phone: formData.phone,
    address: formData.address,
    city: formData.city,
    modelName: formData.modelName,
    amcHistory: [{
      startDate: formData.amcStartDate,
      endDate: formData.amcEndDate,
      amcAmount: formData.amcAmount,
      // serviceDates and status will be handled by backend hooks logic
    }]
  };

  try {
    const res = await fetch("http://localhost:8080/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customerData), // Send nested amcHistory instead of flat fields
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to add customer");
    }

    setSuccess("Customer added successfully!");
    setFormData({
      name: "",
      phone: "",
      address: "",
      city: "",
      modelName: "",
      amcStartDate: "",
      amcEndDate: "",
      amcAmount: "",
    });
  } catch (err) {
    console.error(err);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="row justify-content-center mb-5 mt-5">
      <h3>Add Customer</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

    
    <div className="col-md-12"> {/* Makes form wider */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Model Name</label>
          <input
            type="text"
            name="modelName"
            value={formData.modelName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <h5>AMC Details</h5>

        <div className="mb-3">
          <label className="form-label">AMC Start Date</label>
          <input
            type="date"
            name="amcStartDate"
            value={formData.amcStartDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">AMC End Date</label>
          <input
            type="date"
            name="amcEndDate"
            value={formData.amcEndDate}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">AMC Amount</label>
          <input
            type="number"
            name="amcAmount"
            value={formData.amcAmount}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Customer"}
        </button>
      </form>
    </div>
    </div>
  );
};



export default AddCustomer;

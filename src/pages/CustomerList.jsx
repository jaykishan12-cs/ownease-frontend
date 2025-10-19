import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//accessing the api
const url = process.env.REACT_APP_API_URL;


const CustomerList = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${url}/customers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        setCustomers(data.customers || data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token]);

  if (loading) return <div className="text-center mt-4">Loading customers...</div>;
  if (error) return <div className="alert alert-danger mt-4">{error}</div>;
  if (!customers.length) return <div className="mt-4">No customers found.</div>;

  return (
    <div
      className="container mt-4"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="row">
        {customers.map((c) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={c._id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{c.name || "Unnamed Customer"}</h5>
                <p className="card-text mb-2">
                  <strong>Phone:</strong> {c.phone || "-"} <br />
                  <strong>Address:</strong> {c.address || "-"}
                </p>
                <button
                  className="btn btn-primary mt-auto w-100"
                  onClick={() => navigate(`/customers/${c._id}`)}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;

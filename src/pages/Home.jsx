import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "90vh",
        backgroundColor: "#ffffff",
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }}
    >
      <div className="text-center p-4" style={{ maxWidth: 600 }}>
        {/* Brand/logo section */}
        <div className="mb-4">
          <span
            style={{
              fontWeight: 700,
              fontSize: "2rem",
              color: "#2156c9",
              letterSpacing: "2px",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            }}
          >
            OwnEase
          </span>
        </div>
        <h1
          className="fw-bold text-dark mb-3"
          style={{
            fontSize: "3rem",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Simplify Your Customer Management
        </h1>
        <p
          className="text-dark"
          style={{
            fontSize: "1.25rem",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          Manage your customers, AMCs, and service schedules — all in one place,
          effortlessly.
        </p>
      </div>

      <div
        className="d-flex gap-3 mt-4"
        style={{ maxWidth: 600, width: "100%", justifyContent: "center" }}
      >
        <button
          className="btn btn-primary btn-lg"
          style={{ borderRadius: "0.3rem", boxShadow: "0 0.25rem 0.5rem rgba(0,123,255,0.3)" }}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        <button
          className="btn btn-outline-primary btn-lg"
          style={{ borderRadius: "0.3rem" }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;

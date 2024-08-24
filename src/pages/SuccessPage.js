import React from "react";
import "../styles/CancelPage.css";
import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Payment Successful!</h1>
      <p style={styles.message}>
        Thank you for your purchase. Your payment has been processed
        successfully.
      </p>
      <Link to="/Home">
        <button path="/Home" style={styles.button}>
          Return to Home
        </button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f8ff",
  },
  header: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#4caf50",
  },
  message: {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    textAlign: "center",
  },
  button: {
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer",
  },
};

export default SuccessPage;

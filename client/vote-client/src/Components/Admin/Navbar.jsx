import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/polls" style={styles.navLink}>Polls</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/results" style={styles.navLink}>Results</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/admin" style={styles.navLink}>Admin</Link>
        </li>
      </ul>
    </nav>
  );
};

// Styles for the Navbar
const styles = {
  navbar: {
    backgroundColor: "#1e1e1e",
    padding: "10px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  navList: {
    listStyleType: "none",
    display: "flex",
    justifyContent: "space-around",
    padding: 0,
    margin: 0,
  },
  navItem: {
    margin: "0 15px",
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    transition: "color 0.3s",
  },
  navLinkHover: {
    color: "#ff7f50",
  }
};

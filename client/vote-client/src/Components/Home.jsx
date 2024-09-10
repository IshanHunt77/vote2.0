import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#121212',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
    },
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 50px',
      backgroundColor: '#1e1e1e',
    },
    logo: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#ff9800', // Changed to orange
    },
    navLinks: {
      display: 'flex',
      gap: '20px',
    },
    navLink: {
      color: '#e0e0e0',
      textDecoration: 'none',
      fontWeight: 'bold',
      fontSize: '16px',
      transition: 'color 0.3s',
    },
    navLinkHover: {
      color: '#ff9800', // Changed to orange
    },
    main: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '50px',
    },
    contentContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1200px',
    },
    leftContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    heading: {
      fontSize: '48px',
      fontWeight: 'bold',
      color: '#ff9800', // Changed to orange
      marginBottom: '30px',
    },
    subheading: {
      fontSize: '24px',
      color: '#e0e0e0',
      marginBottom: '50px',
    },
    button: {
      padding: '15px 30px',
      border: 'none',
      borderRadius: '8px',
      backgroundColor: '#ff9800', // Changed to orange
      color: '#000000',
      fontSize: '20px',
      fontWeight: 'bold',
      cursor: 'pointer',
      textDecoration: 'none',
      transition: 'background-color 0.3s, transform 0.2s',
    },
    buttonHover: {
      backgroundColor: '#e67e22', // A darker shade of orange
      transform: 'scale(1.05)',
    },
    rightContent: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginLeft: '50px',
    },
    image: {
      width: '100%',
      maxWidth: '400px',
      borderRadius: '10px',
      marginBottom: '30px',
    },
    pollInfo: {
      fontSize: '18px',
      color: '#e0e0e0',
      textAlign: 'center',
      lineHeight: '1.6',
    },
  };
  

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
      <div style={styles.logo}>BlockVote</div>

        <div style={styles.navLinks}>
          <Link
            to="/user/signup"
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.navLink.color}
          >
            Sign Up
          </Link>
          <Link
            to="/user/signin"
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.navLink.color}
          >
            Sign In
          </Link>
          <Link
            to="/admin/signup"
            style={styles.navLink}
            onMouseEnter={(e) => e.target.style.color = styles.navLinkHover.color}
            onMouseLeave={(e) => e.target.style.color = styles.navLink.color}
          >
            Admin
          </Link>
        </div>
      </nav>

      <main style={styles.main}>
        <div style={styles.contentContainer}>
          <div style={styles.leftContent}>
            <h1 style={styles.heading}>Welcome to Poll Creator</h1>
            <p style={styles.subheading}>Create and share polls with ease</p>
            <Link
              to="/admin/createpoll"
              style={styles.button}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = styles.buttonHover.backgroundColor;
                e.target.style.transform = styles.buttonHover.transform;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = styles.button.backgroundColor;
                e.target.style.transform = 'none';
              }}
            >
              Create Poll
            </Link>
          </div>
          <div style={styles.rightContent}>
            <img 
              src="data:image/jpeg;base64,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" 
              alt="Poll Creator" 
              style={styles.image}
            />
            <p style={styles.pollInfo}>
  Our platform leverages the power of blockchain technology to ensure secure and transparent voting. With decentralized voting, users can cast their votes confidently, knowing their choices are immutable and protected from tampering. Whether it's for community polls, organizational decisions, or public elections, our blockchain-based system guarantees that every vote counts and remains verifiable.
</p>

          </div>
        </div>
      </main>
    </div>
  );
};
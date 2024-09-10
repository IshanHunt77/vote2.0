import React, { useContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { ABI } from '../ABI';
import { NameContext } from './NameContext';

export const Signup = () => {
  const { name, setName } = useContext(NameContext);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [web3Instance, setWeb3Instance] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const contractAddress = '0x4934C0043Ab648E985F980b21177Ab261Ed6d4D7';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch("http://localhost:3013/admin/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, address, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Signup successful:', data);

        if (web3Instance && contractInstance) {
          const accounts = await web3Instance.eth.getAccounts();
          await contractInstance.methods.createAdmin(name, address).send({ from: accounts[0] });
          console.log('Admin created on blockchain');
        }
      } else {
        setError('Signup failed at the backend.');
        console.error('Signup failed');
      }
    } catch (error) {
      setError('An error occurred while processing your signup.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          setWeb3Instance(web3);
          const contract = new web3.eth.Contract(ABI, contractAddress);
          setContractInstance(contract);
        } catch (error) {
          setError('Error initializing Web3 or contract instance.');
          console.error('Error initializing Web3 or contract:', error);
        }
      } else {
        setError('Please install MetaMask to interact with the blockchain.');
        alert('Please install MetaMask to interact with the blockchain.');
      }
    };

    initWeb3();
  }, []);

  return (
    <div style={styles.background}>
      <div style={styles.container}>
        <h1 style={styles.heading}>Sign Up</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form style={styles.form} onSubmit={handleSubmit}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={styles.input}
          />

          <label htmlFor="address" style={styles.label}>Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={styles.input}
          />

          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
            disabled={loading}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
            onMouseDown={(e) => e.currentTarget.style.transform = styles.buttonHover.transform}
            onMouseUp={(e) => e.currentTarget.style.transform = 'none'}
          >
            {loading ? 'Processing...' : 'Sign Up'}
          </button>
        </form>
        <p style={styles.signinLink}>
          Already have an account? <a href="/admin/signin" style={styles.link}>Log in</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  background: {
    minHeight: '100vh', // Ensures it takes the full viewport height
    display: 'flex',
    justifyContent: 'center', // Centers horizontally
    alignItems: 'center', // Centers vertically
    backgroundColor: '#ffffff', // Light background
  },
  container: {
    maxWidth: '400px',
    width: '100%',
    padding: '40px',
    borderRadius: '12px',
    backgroundColor: '#2b2b2b',
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    display: 'flex',
    marginLeft:"550px",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '24px',
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#ff9933',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  label: {
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#cccccc',
    textAlign: 'left',
  },
  input: {
    padding: '12px',
    marginBottom: '20px',
    border: '2px solid #ff9933',
    borderRadius: '8px',
    backgroundColor: '#404040',
    color: '#ffffff',
  },
  button: {
    padding: '12px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#ff9933',
    color: '#000000',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  buttonHover: {
    backgroundColor: '#e68a00',
    transform: 'scale(1.02)',
  },
  signinLink: {
    textAlign: 'center',
    marginTop: '24px',
  },
  link: {
    color: '#ff9933',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

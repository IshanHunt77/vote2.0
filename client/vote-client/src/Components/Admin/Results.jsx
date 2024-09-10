import React, { useState, useEffect, useContext } from "react";
import Web3 from "web3";
import { ABI } from "../ABI";
import { NameContext } from './NameContext';

export const Results = () => {
  const [pollId, setPollId] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const [results, setResults] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { name } = useContext(NameContext);

  const contractAddress = '0x4934C0043Ab648E985F980b21177Ab261Ed6d4D7'; // Ensure this is correct

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const web3 = new Web3(window.ethereum);
          const contract = new web3.eth.Contract(ABI, contractAddress);
          setContractInstance(contract);
        } catch (error) {
          setError('Error initializing Web3 or contract.');
          console.error('Error initializing Web3 or contract:', error);
        }
      } else {
        setError('Please install MetaMask to use this feature.');
        alert("Please install MetaMask to use this feature.");
      }
    };

    initWeb3();
  }, []); // Empty array ensures it runs once after component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (contractInstance) {
      try {
        console.log(pollId);
        console.log(candidateId);
        const result = await contractInstance.methods.getAllVotes(pollId, candidateId).call();
        console.log("Result:", result);
        setResults(result);  // Store result as it is
      } catch (error) {
        setError('Error fetching results.');
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={styles.container}>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Poll ID:
          <input
            type="text"
            value={pollId}
            onChange={(e) => setPollId(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <label style={styles.label}>
          Candidate ID:
          <input
            type="text"
            value={candidateId}
            onChange={(e) => setCandidateId(e.target.value)}
            required
            style={styles.input}
          />
        </label>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Fetching...' : 'Get Results'}
        </button>
      </form>
      {results !== null && (
        <div style={styles.resultsContainer}>
          <p style={styles.resultsText}>Results: {results.toString()}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1a1a1a', // Dark background
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    margin: '40px auto',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    color: '#f0f0f0',
    textAlign: 'center'
  },
  error: {
    color: 'red',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    color: '#e0e0e0', // Light grey text
    fontSize: '16px',
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #4caf50', // Green border
    backgroundColor: '#333', // Dark input background
    color: '#fff',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4caf50', // Sharp green button
    border: 'none',
    borderRadius: '4px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#43a047',
  },
  resultsContainer: {
    marginTop: '20px',
    backgroundColor: '#2e2e2e',
    padding: '10px',
    borderRadius: '4px',
  },
  resultsText: {
    color: '#b0ffb0', // Light greenish text for results
    fontWeight: 'bold',
  },
};

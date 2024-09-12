import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { ABI } from "../ABI";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocation } from "react-router-dom";

export const Results = () => {
  const location = useLocation();
  const { pollId: initialPollId, candidates: initialCandidates } = location.state || {};
  const [results, setResults] = useState([]);
  const [contractInstance, setContractInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pollId, setPollId] = useState(initialPollId || '');
  const [candidates, setCandidates] = useState(initialCandidates || []);
  const contractAddress = '0x4934C0043Ab648E985F980b21177Ab261Ed6d4D7';

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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (contractInstance && pollId && candidates.length > 0) {
      try {
        const results = await Promise.all(
          candidates.map((_, idx) => contractInstance.methods.getAllVotes(pollId, idx + 1).call())
        );

        const pollResults = candidates.map((name, idx) => ({
          name,
          votes: parseInt(results[idx])
        }));

        setResults(pollResults);
      } catch (error) {
        setError('Error fetching results.');
        console.error("Error fetching results:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please ensure pollId and candidates are set.');
      setLoading(false);
    }
  };

  const totalVotes = results ? results.reduce((sum, option) => sum + option.votes, 0) : 0;

  return (
    <div className="results-container">
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input 
          type="text" 
          value={pollId} 
          onChange={(e) => setPollId(e.target.value)} 
          placeholder="Enter Poll ID"
          className="input-field"
        />
        <button type="submit" disabled={loading} className="button">
          {loading ? 'Fetching...' : 'Get Results'}
        </button>
      </form>
      {results.length > 0 && (
        <div className="poll-results">
          <h2 className="poll-question">Poll Results (ID: {pollId})</h2>
          <div className="options-list">
            {results.map((option, index) => (
              <div key={index} className="option-item">
                <div className="option-content">
                  <div className="option-header">
                    <span className="option-text">{option.name}</span>
                    <span className="vote-count">{option.votes} votes</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${(option.votes / totalVotes * 100) || 0}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={results}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="votes" fill="#4caf50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      <style jsx>{`
        .results-container {
          background-color: #1a1a1a;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
          margin: 40px auto;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          color: #f0f0f0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .error {
          color: red;
          margin-bottom: 10px;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 15px;
          width: 100%;
          max-width: 400px;
        }
        .input-field {
  padding: 10px;
  border: 1px solid #ccc;
  background-color: #2e2e2e;
  border-radius: 4px;
  font-size: 1rem;
  color: #fff; /* Set text color to white */
}

        .button {
          padding: 10px 20px;
          background-color: #4caf50;
          border: none;
          border-radius: 4px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #43a047;
        }
        .poll-results {
          background-color: #2e2e2e;
          padding: 20px;
          border-radius: 8px;
          margin-top:25px;
          width: 100%;
          max-width: 500px;
        }
        .poll-question {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 20px;
          color: #fff;
        }
        .options-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .option-item {
          display: flex;
          align-items: center;
        }
        .option-content {
          width: 100%;
        }
        .option-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }
        .option-text, .vote-count {
          font-size: 0.875rem;
          font-weight: 500;
          color: #e0e0e0;
        }
        .progress-bar-bg {
          width: 100%;
          background-color: #444;
          height: 10px;
          border-radius: 9999px;
        }
        .progress-bar-fill {
          background-color: #4caf50;
          height: 100%;
          border-radius: 9999px;
        }
        .chart-container {
          margin-top: 20px;
          padding: 10px;
          background-color: #333;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

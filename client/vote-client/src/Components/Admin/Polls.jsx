import React, { useContext, useEffect, useState } from "react";
import { AddressContext } from "./AddressContext";
import { TokenContext } from "./TokenContext";
import { NameContext } from "./NameContext";
import { ABI } from "../ABI";
import Web3 from "web3";

export const Polls = () => {
  const { address } = useContext(AddressContext);
  const { token } = useContext(TokenContext);
  const { name } = useContext(NameContext);
  const [polls, setPolls] = useState([]);
  const [error, setError] = useState(null);
  const [web3Instance, setWeb3Instance] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const contractAddress = '0x4934C0043Ab648E985F980b21177Ab261Ed6d4D7';

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch(`http://localhost:3013/admin/polls?adminId=${address}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data.response)) {
            setPolls(data.response);
          } else {
            setError("Unexpected response format.");
          }
        } else {
          setError("Failed to fetch polls.");
        }
      } catch (error) {
        setError("Error fetching polls.");
      }
    };

    fetchPolls();

    const initWeb3 = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(ABI, contractAddress); 
        setWeb3Instance(web3);
        setContractInstance(contract);
      } else {
        alert("Please install a MetaMask wallet to vote.");
      }
    };

    initWeb3();
  }, [address, token]);

  const handlevote = async (pollId, candidateIndex) => {
    if (!contractInstance || !web3Instance) {
      return setError("Contract or Web3 instance not initialized.");
    }

    try {
      const accounts = await web3Instance.eth.getAccounts();
      console.log(name)
      console.log(pollId)
      console.log(candidateIndex)
      const response = await contractInstance.methods
        .votes(name, pollId, candidateIndex+1)
        .send({ from: accounts[0] });

      console.log("Vote successful:", response);
    } catch (error) {
      console.error("Error casting vote:", error);
      setError("Error casting vote.");
    }
  };

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <ul style={styles.pollList}>
        {polls.length === 0 ? (
          <li style={styles.noPolls}>No polls available.</li>
        ) : (
          polls.map((poll) => (
            <li key={poll._id.$oid || poll._id} style={styles.pollItem}>
              <div style={styles.pollId}>
                <strong>Poll ID:</strong> {poll.pollID || poll._id.$oid || poll._id}
              </div>
              <ul style={styles.candidatesList}>
                {poll.candidates.length > 0 ? (
                  poll.candidates.map((candidate, idx) => (
                    <li key={idx} style={styles.candidateItem}>
                      <button
                        style={styles.candidateButton}
                        onClick={() => handlevote(poll._id.$oid || poll._id, idx)}
                      >
                        {candidate}
                      </button>
                    </li>
                  ))
                ) : (
                  <li style={styles.noCandidates}>No candidates available.</li>
                )}
              </ul>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "800px",
    margin: "20px auto",
  },
  pollList: {
    listStyleType: "none",
    padding: 0,
  },
  pollItem: {
    marginBottom: "20px",
    padding: "10px",
    border: "1px solid #444",
    borderRadius: "8px",
    backgroundColor: "#2b2b2b",
  },
  pollId: {
    fontSize: "18px",
    marginBottom: "10px",
  },
  candidatesList: {
    listStyleType: "none",
    padding: 0,
  },
  candidateItem: {
    marginBottom: "5px",
  },
  candidateButton: {
    backgroundColor: "#ff7f50",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  noPolls: {
    fontSize: "18px",
    color: "#bbb",
  },
  noCandidates: {
    fontSize: "16px",
    color: "#bbb",
  },
  error: {
    color: "red",
    fontSize: "18px",
    textAlign: "center",
  },
};

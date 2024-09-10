import React, { useState, useContext } from 'react';
import { TokenContext } from './TokenContext';
import { AddressContext } from './AddressContext';
import { useNavigate } from 'react-router-dom';
import './CreatePoll.css'

export const Createpoll = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [options, setOptions] = useState(['', '']);
  const navigate = useNavigate();

  const { token } = useContext(TokenContext);
  const { address, setAddress } = useContext(AddressContext);

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3013/admin/createpoll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ candidates: options, adminId: address }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Poll created:', data);
      } else {
        console.error('Poll creation failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
    navigate("/admin/polls");
  };

  return (
    <div className="create-poll-page">
      {/* Navbar */}
      <div className="navbar">
        <button className="nav-button" onClick={() => navigate('/')}>Home</button>
        <button className="nav-button" onClick={() => navigate('/admin/polls')}>Polls</button>
        <button className="nav-button" onClick={() => navigate('/admin/results')}>Results</button>
        <button className="nav-button" onClick={() => navigate('/about')}>About</button>
      </div>

      {/* Poll Creation */}
      <div className="center-button-container">
        {!isFormVisible && (
          <button
            className="create-poll-button"
            onClick={() => setIsFormVisible(true)}
          >
            Create Poll
          </button>
        )}

        {isFormVisible && (
          <div className="create-poll-form">
            <div className='createpoll-container'>
            <h2 className="create-poll-heading">Create a New Poll</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="MetaMask Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="input"
                required
              />

              {options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="input"
                  required
                />
              ))}

              <button
                type="button"
                className="add-option-button"
                onClick={handleAddOption}
              >
                Add Option
              </button>

              <button
                type="submit"
                className="submit-button"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

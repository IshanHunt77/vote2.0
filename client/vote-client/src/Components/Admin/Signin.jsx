import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { TokenContext } from './TokenContext'; 
import { NameContext } from './NameContext';
import { AddressContext } from './AddressContext';

export const Signin = () => {
    const { setName } = useContext(NameContext); 
    const { setAddress } = useContext(AddressContext);
    const [name, setNameInput] = useState("");  
    const [address, setAddressInput] = useState("");  
    const [password, setPassword] = useState("");
    const { setToken } = useContext(TokenContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3013/admin/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, address, password })
            });
            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setName(name);  
                setAddress(address);  
                console.log("Token:", data.token);
                navigate("/admin/createpoll");
            } else {
                console.error("Signin failed");
            }
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };

    const styles = {
        background: {
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ffffff', // Light background
        },
        container: {
            maxWidth: '400px',
            width: '100%',
            marginLeft:"550px",
            padding: '40px',
            borderRadius: '12px',
            backgroundColor: '#2b2b2b',
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
            color: '#ffffff',
        },
        heading: {
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#ff9933',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
        },
        label: {
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#cccccc',
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

    return (
        <div style={styles.background}>
            <div style={styles.container}>
                <h1 style={styles.heading}>Sign In</h1>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <label htmlFor="name" style={styles.label}>Name</label>
                    <input 
                        type="text" 
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setNameInput(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="address" style={styles.label}>Address</label>
                    <input 
                        type="text" 
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddressInput(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <label htmlFor="password" style={styles.label}>Password</label>
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={styles.input}
                    />

                    <button
                        type="submit"
                        style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                        onMouseDown={(e) => e.currentTarget.style.transform = styles.buttonHover.transform}
                        onMouseUp={(e) => e.currentTarget.style.transform = 'none'}
                    >
                        Sign In
                    </button>
                </form>
                <p style={styles.signinLink}>
                    Don't have an account? <a href="/admin/signup" style={styles.link}>Sign Up</a>
                </p>
            </div>
        </div>
    );
};

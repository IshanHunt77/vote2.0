import React, { createContext, useState } from 'react';

// Create the context
export const TokenContext = createContext();

// Create a provider component
export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState('');

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

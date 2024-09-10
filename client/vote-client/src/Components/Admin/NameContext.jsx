import React, { createContext, useState } from 'react';

// Create the context
export const NameContext = createContext();

// Create a provider component
export const NameProvider = ({ children }) => {
    const [name, setName] = useState('');

    return (
        <NameContext.Provider value={{ name, setName }}>
            {children}
        </NameContext.Provider>
    );
};

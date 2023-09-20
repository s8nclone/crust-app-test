import React, { createContext, useState } from "react";

const AuthContext = createContext();

const ContextProvider = (props) => {
    const [hasUser, setUser] = useState(false);
    const [name, setName] = useState('');

    return (
        <AuthContext.Provider value={{ hasUser, setUser, name, setName }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {ContextProvider, AuthContext}
import React, { createContext, useState, useEffect } from 'react';

export const DecodeJwtContext = createContext();

const DecodeJwtContextProvider = (props) => {

    const [decodedJwt, setDecodedJwt] = useState(null);

    useEffect(() => {
        const jwt = sessionStorage.getItem("token");
        if (jwt) {
            const decodedToken = JSON.parse(atob(jwt.split('.')[1]));
            setDecodedJwt(decodedToken);
        }
    }, []);

    return (
        <DecodeJwtContext.Provider value={{ decodedJwt }}>
            {props.children}
        </DecodeJwtContext.Provider>
    );
}
export default DecodeJwtContextProvider;
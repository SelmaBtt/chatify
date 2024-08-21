import React, { createContext, useState, useEffect } from 'react';

export const LogInContext = createContext();

const LogInContextProvider = (props) => {

    // To get the CSRF token

    const [csrf, setCsrf] = useState('')

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/csrf`, {
          method: 'PATCH',
        })
        .then(res => res.json())
        .then(data => setCsrf(data.csrfToken))
    }, []);

    // Messages
    const [errMsg, setErrMsg] = useState('')
    const [jwtToken, setJwtToken] = useState('')

    // Log in values
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')

    const [mail, setMail] = useState('')
    const [avatar, setAvatar] = useState('')


    const loginHandler = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: username, 
                    password: pass,
                    csrfToken: csrf 
                }),
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error);
            }

            const data = await response.json();
            setJwtToken(data.token);
        } catch (error) {
            setErrMsg(error.message ? error.message : 'Something went wrong while trying to log in. Try again later');
        }
    };

    useEffect(() => {
        if (jwtToken) {
            console.log('JWT Token:', jwtToken);
        }
    }, [jwtToken]);


    return(
        <LogInContext.Provider value={{ 
            loginHandler, errMsg, jwtToken,
            username, setUsername,
            pass, setPass,
        }}>
            {props.children}
        </LogInContext.Provider>
    )
}
export default LogInContextProvider;
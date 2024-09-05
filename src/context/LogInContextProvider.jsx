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
    const [jwtToken, setJwtToken] = useState(sessionStorage.getItem('token') || '')
    const [decodedJwt, setDecodedJwt] = useState(JSON.parse(sessionStorage.getItem('decodedToken')) || '')

    // User values
    const [username, setUsername] = useState(decodedJwt.user || '')
    const [email, setEmail] = useState(decodedJwt.email || '')
    const [pass, setPass] = useState(decodedJwt.password || '')
    const [avatar, setAvatar] = useState(decodedJwt.avatar || '')

    // Check authentication
    const [isAuth, setIsAuth] = useState((sessionStorage.getItem('isAuth') === 'true') || false)

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
            // Save JWT
            setJwtToken(data.token);
            sessionStorage.setItem('token', data.token);
            const decodedJwt = JSON.parse(atob(data.token.split('.')[1]));
            setDecodedJwt(decodedJwt)
            sessionStorage.setItem('decodedToken', JSON.stringify(decodedJwt));
            // console.log(decodedJwt) 
            // Save authentication values
            setIsAuth(true);
            sessionStorage.setItem('isAuth', true);
        } catch (error) {
            setErrMsg(error.message ? error.message : 'Something went wrong while trying to log in. Try again later');
            console.error(`Error: ${error}`)
        }
    };

    useEffect(() => {
        if (jwtToken) {
            console.log(`[${new Date(). toISOString()}] Log in Success for user: ${decodedJwt.id}`);
        }
    }, [jwtToken]);


    return(
        <LogInContext.Provider value={{ 
            decodedJwt, setDecodedJwt,
            loginHandler, errMsg,
            username, setUsername,
            email, setEmail,
            pass, setPass,
            avatar, setAvatar,
            isAuth, setIsAuth,
        }}>
            {props.children}
        </LogInContext.Provider>
    )
}
export default LogInContextProvider;
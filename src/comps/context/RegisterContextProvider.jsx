import React, { createContext, useState, useEffect } from 'react';

export const RegisterContext = createContext();

const RegisterContextProvider = (props) => {

    // To get the CSRF token

    const [csrf, setCsrf] = useState('')

    useEffect(() => {
        fetch('https://chatify-api.up.railway.app/csrf', {
          method: 'PATCH',
        })
        .then(res => res.json())
        .then(data => setCsrf(data.csrfToken))
    }, []);


    // To create account

    // Success or error messages useStates
    const [succMsg, setSuccMsg] = ('');
    const [errMsg, setErrMsg] = useState('');

    // Account values useStates
    const [username, setUsername] = ('')
    const [pass, setPass] = ('')
    const [mail, setMail] = ('')
    const [avatar, setAvatar] = ('')

    const createAccBtn = async(e) => {
        e.preventDefault();
        try {
            setErrorMessage(false)
            const response = await fetch('https://chatify-api.up.railway.app/auth/register', {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    username: username,
                    password: pass,
                    email: mail,
                    avatar: avatar,
                    csrfToken: csrf,
                })
            })
            if (response.ok) {
                setSuccMsg(response.message)
            } else {
                throw new Error(response.error);
            }
        } catch (error) {
            setErrMsg(error)
        }
    };

    return(
        <RegisterContext.Provider value={{ 
            succMsg, errMsg,
            setUsername,
            setPass,
            setMail,
            setAvatar,
        }}>
            {props.children}
        </RegisterContext.Provider>
    )
}
export default RegisterContextProvider;
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
    const [succMsg, setSuccMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');

    // Account values useStates
    const [username, setUsername] = useState('')
    const [pass, setPass] = useState('')
    const [mail, setMail] = useState('')
    const [avatar, setAvatar] = useState('')

    const createAccBtn = async(e) => {
        try {
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
                setSuccMsg(response.message ? response.message : 'Your account has been created')
            } else {
                throw new Error(response.error ? response.error : 'Something went wrong!');
            }
        } catch (error) {
            setErrMsg(error)
        }
    };

    return(
        <RegisterContext.Provider value={{ 
            createAccBtn,
            succMsg, errMsg,
            username, setUsername,
            pass, setPass,
            mail, setMail,
            avatar, setAvatar,
        }}>
            {props.children}
        </RegisterContext.Provider>
    )
}
export default RegisterContextProvider;
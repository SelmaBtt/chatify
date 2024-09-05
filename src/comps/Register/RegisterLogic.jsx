import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DisplayRegister from './DisplayRegister';

const RegisterLogic = () => {

    // To get the CSRF token

    const [csrf, setCsrf] = useState('')

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/csrf`, {
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

    const navigate = useNavigate()

    const createAccBtn = async(imgUrl) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    username: username,
                    password: pass,
                    email: mail,
                    avatar: imgUrl,
                    csrfToken: csrf,
                })
            })
            if (response.ok) {
                setSuccMsg(response.message ? response.message : 'Your account has been created')
                // Reset all values
                setUsername('')
                setPass('')
                setMail('')
                navigate('/log-in')
            } else {
                setErrMsg(response.error ? response.error : 'Something went wrong. Try again later');
            }
        } catch (error) {
            console.error('An error has occured', error);
        }
    };

    return(
        <>
            <DisplayRegister 
                createAccBtn={createAccBtn}
                succMsg={succMsg} errMsg={errMsg}
                username={username} setUsername={setUsername}
                pass={pass} setPass={setPass}
                mail={mail} setMail={setMail}
                avatar={avatar} setAvatar={setAvatar}
            />
        </>
    )
};

export default RegisterLogic;
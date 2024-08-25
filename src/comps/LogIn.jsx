import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LogInContext } from '../context/LogInContextProvider';

const LogIn = () => {
    const { loginHandler, errMsg,
        username, setUsername,
        pass, setPass, isAuth } = useContext(LogInContext)
    
    // To redirect the user to the chat 
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate('/chat');
        }
    }, [isAuth, navigate]);

    return(
        <>
            <Link to={'/'}>Home</Link>  
            <input 
                type="text" 
                value={username}
                onChange={(e) => { setUsername(e.target.value) }} 
            />
            <input 
                type="text" 
                value={pass}
                onChange={(e) => { setPass(e.target.value) }} 
            />
            <button onClick={loginHandler}>Log in</button>

            {/* Error message */}
            {(errMsg && errMsg.length > 0) &&
                <p>{errMsg}</p>
            }
        </>
    )
}

export default LogIn;
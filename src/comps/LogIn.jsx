import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LogInContext } from '../context/LogInContextProvider';
import { ConversationContext } from '../context/ConversationContextProvider';

const LogIn = () => {
    const { loginHandler, errMsg,
        username, setUsername,
        pass, setPass, isAuth } = useContext(LogInContext)
    const { getConversations } = useContext(ConversationContext)
    
    // To redirect the user to the chat 
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            getConversations();
            navigate('/chat');
        }
    }, [isAuth, navigate]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            loginHandler();
        }
    };

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
                onKeyDown={handleKeyDown}
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
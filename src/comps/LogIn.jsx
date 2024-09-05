import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { LogInContext } from '../context/LogInContextProvider';
import { ConversationContext } from '../context/ConversationContextProvider';
import styles from '../styles/RegLogin.module.css'

const LogIn = () => {
    const { loginHandler, errMsg,
        username, setUsername,
        pass, setPass, isAuth } = useContext(LogInContext)
    const { getConversationIds } = useContext(ConversationContext)
    
    // To redirect the user to the chat 
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            getConversationIds();
            navigate('/chat');
        }
    }, [isAuth, navigate]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            loginHandler();
        }
    };

    return(
        <div className='containerBase'>
            <div className={`${styles.contentWrapperLogin} contentWrapperBase`}>
                <div className={styles.titleWrapper}>
                    <Link to={'/'} className={styles.backLink}>Home</Link>  
                    <h1>Log in</h1>
                </div>
                <label htmlFor="theUsername" className={styles.label}>
                    Username
                </label>
                <input 
                    className={styles.input}
                    type="text" 
                    id="theUsername" 
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }} 
                />
                <label htmlFor="password" className={styles.label}>
                    Password
                </label>
                <input 
                    className={styles.input}
                    type="password" 
                    value={pass}
                    id="password"
                    onChange={(e) => { setPass(e.target.value) }} 
                    onKeyDown={handleKeyDown}
                />
                <button onClick={loginHandler}>Log in</button>

                {/* Error message */}
                {(errMsg && errMsg.length > 0) &&
                    <div className={`${styles.errContainer} popupContainer`}>
                        <p>{errMsg}</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default LogIn;
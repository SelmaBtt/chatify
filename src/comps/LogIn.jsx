import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LogInContext } from '../context/LogInContextProvider';

const LogIn = () => {
    const { loginHandler, errMsg, jwtToken,
        username, setUsername,
        pass, setPass, } = useContext(LogInContext)

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
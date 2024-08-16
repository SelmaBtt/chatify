import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { RegisterContext } from './context/RegisterContextProvider';

const Register = () => {

    const { createAccBtn,
        succMsg, errMsg,
        username, setUsername,
        pass, setPass,
        mail, setMail,
        avatar, setAvatar, } = useContext(RegisterContext)
    
    return(
        <>
            <Link to={'/'}>Home</Link>  

            <div>
                <label htmlFor="email">E-mail</label>
                <input 
                    type="text" 
                    id="email" 
                    value={mail}
                    onChange={(e) => { setMail(e.target.value) }} 
                />

                <label htmlFor="theUsername">Username</label>
                <input 
                    type="text" 
                    id="theUsername" 
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }} 
                />

                <label htmlFor="password">Password</label>
                <input 
                    type="text" 
                    id="password"
                    value={pass} 
                    onChange={(e) => { setPass(e.target.value) }} 
                />

                <button onClick={createAccBtn}>
                    Create account
                </button>
            </div>

            {(succMsg && succMsg.length > 0) &&
                <p>{succMsg}</p>
            }
            {(errMsg && errMsg.length > 0) &&
                <p>{errMsg}</p>
            }
        </>
    )
}

export default Register
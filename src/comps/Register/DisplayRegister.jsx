import { Link } from 'react-router-dom';
import styles from '../../styles/RegLogin.module.css'


const DisplayRegister = ({ 
    createAccBtn, succMsg, errMsg, username, setUsername, pass, setPass, mail, setMail, avatar, setAvatar, 
}) => {

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            createAccBtn();
        }
    };
    
    return(
        <div className='containerBase'>
            <div className={`${styles.contentWrapperReg} contentWrapperBase`}>
                <div className={styles.titleWrapper}>
                    <Link to={'/'} className={styles.backLink}>Back</Link>  
                    <h1>Register account</h1>
                </div>
        
                <label htmlFor="email" className={styles.label}>
                    E-mail
                </label>
                <input 
                    className={styles.input}
                    type="text" 
                    id="email" 
                    value={mail}
                    onChange={(e) => { setMail(e.target.value) }} 
                />

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
                    type="text" 
                    id="password"
                    value={pass} 
                    onChange={(e) => { setPass(e.target.value) }} 
                    onKeyDown={handleKeyDown}
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
        </div>
    )
}

export default DisplayRegister;
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import styles from '../../styles/RegLogin.module.css'
import { AvatarContext } from '../../context/AvatarContextProvider';


const DisplayRegister = ({ 
    createAccBtn, succMsg, errMsg, username, setUsername, pass, setPass, mail, setMail,
}) => {
    const { imageUrl, handleFileChange } = useContext(AvatarContext)

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            createAccBtn(imageUrl);
        }
    };

    const returnHandler = () => {
        setUsername("")
        setMail("")
        setPass("")
    };
    
    return(
        <div className='containerBase'>
            <div className={`${styles.contentWrapperReg} contentWrapperBase`}>
                <div className={styles.titleWrapper}>
                    <Link onClick={() => returnHandler()} to={'/'} className={styles.backLink}>Back</Link>  
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
                    type="password" 
                    id="password"
                    value={pass} 
                    onChange={(e) => { setPass(e.target.value) }} 
                    onKeyDown={handleKeyDown}
                />

                <label className={styles.label}>Upload an avatar</label>
                <div className={styles.uploadWrapper}>
                    <input type="file" onChange={handleFileChange} className={styles.imgInput} />
                        {imageUrl && (
                            <div className={styles.imgWrapper}>
                                <p>Uploaded image:</p>
                                <img src={imageUrl} alt="Uploaded" className={styles.imgUploaded} />
                                <p>URL: <a href={imageUrl} target="_blank">{imageUrl}</a></p>
                            </div>
                        )}
                </div>

                <button onClick={() => createAccBtn(imageUrl)}>
                    Create account
                </button>
            </div>

            {(succMsg && succMsg.length > 0) &&
                <div className={`${styles.succContainer} popupContainer`}>
                    <p>{succMsg}</p>
                </div>
            }
            {(errMsg && errMsg.length > 0) &&
                <div className={`${styles.errContainer} popupContainer`}>
                    <p>{errMsg}</p>
                </div>
            }
        </div>
    )
}

export default DisplayRegister;
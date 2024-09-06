import placeholderAvatar from '../../assets/placeholderAvatar.jpg'
import styles from '../../styles/Profile.module.css'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { LogInContext } from '../../context/LogInContextProvider'
import { AvatarContext } from '../../context/AvatarContextProvider'

const DisplayProfile = ({ errMsg, isErrMsg, confirmDel, updateUserHandler, delAccountHandler }) => {
    const { decodedJwt, setDecodedJwt, 
        username, setUsername,
        email, setEmail, avatar,
        setIsAuth, setShowConversation } = useContext(LogInContext);
    
    const { imageUrl, handleFileChange } = useContext(AvatarContext)
    
    const [isOpenDel, setIsOpenDel] = useState(false);

    // Handle delete ui
    const toggleDeleteMessage = () => setIsOpenDel(!isOpenDel); 
    return(
        <>
            <Link className={styles.backLink} to={'/chat'}>Back</Link>
            <div className={styles.container}>
                <div className={`${styles.displayCurrentInfo} contentWrapperBase`}>
                    <img src={decodedJwt.avatar || placeholderAvatar} alt="profile picture" />
                    <hr />
                    <div className={styles.userDetails}>
                        <h2>E-mail:</h2>
                        <p>{decodedJwt.email}</p>
                        <h2>Username:</h2>
                        <p>{decodedJwt.user}</p>
                    </div>
                </div>

                <div className={styles.accountChangeWrapper}>
                    <h1>Update your profile</h1>
                    <div className={`${styles.updateContainer} contentWrapperBase`}>
                        <input 
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input 
                            type="text" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className={styles.updImgContainer}>
                            <input 
                                type="file"
                                onChange={handleFileChange} 
                            />
                            {imageUrl ? (
                                <div className={styles.uploadImgContainer}>
                                    <p>Uploaded Image:</p>
                                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                                    <p>URL: <a href={imageUrl} target="_blank">{imageUrl}</a></p>
                                </div>
                            ) : decodedJwt.avatar ? (
                                <div className={styles.uploadImgContainer}>
                                    <p>Your avatar:</p>
                                    <img src={decodedJwt.avatar} alt="Current image" />
                                    <p>URL: <a href={decodedJwt.avatar} target="_blank">{decodedJwt.avatar}</a></p>
                                </div>
                            ) : (
                                <div className={styles.uploadImgContainer}>
                                    <p>Your avatar:</p>
                                    <img src={placeholderAvatar} alt="Current image" />
                                </div>
                            )}
                        </div>
                        <div className={styles.changeBtn}>
                            <button onClick={updateUserHandler}>Submit changes</button>
                        </div>
                    </div>
                    <div>
                        <button onClick={toggleDeleteMessage}>Delete Account</button>
                    </div>
                </div>

                <div className={isOpenDel ? `${styles.delWindow} ${styles.openDelWindow}` : `${styles.delWindow} ${styles.closedDelWindow}`}>
                    <p onClick={toggleDeleteMessage}>
                        Close
                    </p>
                    <h2>You're about to delete your account!</h2>
                    <p>Are you sure you want to delete your account?</p>
                    <div className={styles.delBtnWrapper}>
                        <button onClick={delAccountHandler}>Yes</button>
                        <button onClick={toggleDeleteMessage}>No</button>
                    </div>
                    <p>{confirmDel}</p>
                </div>

                {isOpenDel && <div className={styles.overlay} onClick={toggleDeleteMessage}></div>}

                {isErrMsg && <div className={`${styles.errMsgPopup} popupContainer`}>{errMsg}</div>}
            </div>
        </>
    )
}

export default DisplayProfile;
import { useContext, useState } from "react";
import { LogInContext } from "../context/LogInContextProvider";
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/Profile.module.css'
import { AvatarContext } from "../context/AvatarContextProvider";
import placeholderAvatar from '../assets/placeholderAvatar.jpg'

const Profile = () => {
    const { decodedJwt, setDecodedJwt, 
        username, setUsername,
        email, setEmail,
        avatar,
        setIsAuth, setShowConversation } = useContext(LogInContext);
    
    const { imageUrl, handleFileChange } = useContext(AvatarContext)


    const [errMsg, setErrMsg] = useState('')
    const [isErrMsg, setIsErrMsg] = useState(false)

    const [isOpenDel, setIsOpenDel] = useState(false);

    const [confirmDel, setConfirmDel] = useState('')

    // Handle delete ui
    const toggleDeleteMessage = () => setIsOpenDel(!isOpenDel); 

    // To redirect the user back to the chat component
    const navigate = useNavigate();

    const updateUserHandler = () => {
        fetch(import.meta.env.VITE_API_URL + '/user', {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "userId": decodedJwt.id,
                "updatedData": {
                    "username": username,
                    "email": email,
                    "avatar": imageUrl || avatar,
                }
            })
        })
        .then(response => {
            if (!response.ok) {
                console.error('Problem with updating the profile');
            }
            return response.json();
        })
        .then(data => {
            console.log("Successfully updated your profile" + JSON.stringify(data));
            setDecodedJwt(prev => ({
                ...prev,
                user: username,
                email: email,
                avatar: imageUrl || avatar,
            }));
            sessionStorage.setItem('decodedToken', JSON.stringify({
                ...decodedJwt,
                user: username,
                email: email,
                avatar: imageUrl || avatar,
            }));
            navigate('/chat')
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            setErrMsg(error.message ? error.message : 'Something went wrong while trying to update your profile. Try again later')
            setIsErrMsg(true)
            setTimeout(() => {
                setIsErrMsg(false)
            }, 2000)
        })
    };

    const delAccountHandler = () => {
        fetch(`${import.meta.env.VITE_API_URL}/users/${decodedJwt.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                console.error('Problem with deleting your account');
            }
            return response.json();
        })
        .then(data => {
            setConfirmDel(data.message ? data.message : 'Your account has been deleted')
            setTimeout(() => {
                sessionStorage.clear();
                setIsAuth(false)
                setShowConversation(false)
                navigate('/log-in')
            }, 1500);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    };

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
                            ) : avatar ? (
                                <div className={styles.uploadImgContainer}>
                                    <p>Your avatar:</p>
                                    <img src={avatar} alt="Current image" />
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

export default Profile;
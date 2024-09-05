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
        pass, setPass,
        avatar, setAvatar,
        setIsAuth, setShowConversation } = useContext(LogInContext);
    
    const { imageUrl, setImageUrl, handleFileChange } = useContext(AvatarContext)


    const [errMsg, setErrMsg] = useState('')

    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDel, setIsOpenDel] = useState(false);

    const [confirmDel, setConfirmDel] = useState('')

    // Handle update ui
    const toggleModal = () => setIsOpenUpdate(!isOpenUpdate); 

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
            <div>
                <Link to={'/chat'}>Back</Link>
                <h1>
                    {decodedJwt.user}
                </h1>
                <img style={{height: "100px"}} src={decodedJwt.avatar || placeholderAvatar} alt="profile picture" />
                <p>E-mail: {decodedJwt.email}</p>

                <button onClick={toggleModal}>
                    {isOpenUpdate ? "Close" : "Update your profile"}
                </button>
                <div className={isOpenUpdate ? `${styles.updateWindow} ${styles.openUpdateWindow}` : `${styles.updateWindow} ${styles.closedUpdateWindow}`}>
                    <p>Username</p>
                    <input 
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p>E-mail</p>
                    <input 
                        type="text" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p>Profile picture</p>
                    <input 
                        type="file"
                        onChange={handleFileChange} 
                    />
                    {imageUrl ? (
                        <div>
                            <h3>Uploaded Image:</h3>
                            <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '100%' }} />
                            <p>URL: <a href={imageUrl} target="_blank">{imageUrl}</a></p>
                        </div>
                    ) : avatar ? (
                        <div>
                            <h3>Your avatar</h3>
                            <img src={avatar} alt="Current image" />
                        </div>
                    ) : (
                        <div>
                            <h3>Your avatar</h3>
                            <img src={placeholderAvatar} alt="Current image" />
                        </div>
                    )}
                    <button onClick={updateUserHandler}>Submit changes</button>
                </div>

                <button onClick={toggleDeleteMessage}>Delete Account</button>

                <div className={isOpenDel ? `${styles.delWindow} ${styles.openDelWindow}` : `${styles.delWindow} ${styles.closedDelWindow}`}>
                    <button onClick={toggleDeleteMessage}>
                        Close
                    </button>
                    <h2>You're about to delete your account!</h2>
                    <p>Are you sure you want to delete your account?</p>
                    <button onClick={delAccountHandler}>Yes</button>
                    <button onClick={toggleDeleteMessage}>No</button>
                    <p>{confirmDel}</p>
                </div>

                {isOpenDel && <div className={styles.overlay} onClick={toggleDeleteMessage}></div>}
            </div>
        </>
    )
}

export default Profile;
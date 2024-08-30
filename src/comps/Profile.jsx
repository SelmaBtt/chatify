import { useContext, useState } from "react";
import { LogInContext } from "../context/LogInContextProvider";
import { Link, useNavigate } from "react-router-dom";
import styles from '../styles/Profile.module.css'
import placeholderAvatar from '../assets/placeholderAvatar.jpg'

const Profile = () => {
    const { decodedJwt, setDecodedJwt, 
        username, setUsername,
        email, setEmail,
        pass, setPass,
        avatar, setAvatar } = useContext(LogInContext);

    const [errMsg, setErrMsg] = useState('')

    // Handle update ui
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen); 

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
                    "avatar": avatar,
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
                avatar: avatar,
            }));
            sessionStorage.setItem('decodedToken', JSON.stringify({
                ...decodedJwt,
                user: username,
                email: email,
                avatar: avatar,
            }));
            navigate('/chat')
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            setErrMsg(error.message ? error.message : 'Something went wrong while trying to update your profile. Try again later')
        })
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
                    {isOpen ? "Close" : "Update your profile"}
                </button>
                <div className={isOpen ? `${styles.updateWindow} ${styles.openUpdateWindow}` : `${styles.updateWindow} ${styles.closedUpdateWindow}`}>
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
                        type="url" 
                        value={avatar}
                        onChange={(e) => setAvatar(e.target.value)}
                    />
                    <button onClick={updateUserHandler}>Submit changes</button>
                </div>
            </div>
        </>
    )
}

export default Profile;
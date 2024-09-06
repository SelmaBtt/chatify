import { useContext, useState } from "react";
import { LogInContext } from "../../context/LogInContextProvider";
import { AvatarContext } from "../../context/AvatarContextProvider";
import { useNavigate } from "react-router-dom";
import DisplayProfile from "./DisplayProfile";


const Profile = () => {
    const { decodedJwt, setDecodedJwt, 
        username, email, avatar, setIsAuth, setShowConversation } = useContext(LogInContext);
    
    const { imageUrl } = useContext(AvatarContext)


    const [errMsg, setErrMsg] = useState('')
    const [isErrMsg, setIsErrMsg] = useState(false)

    const [confirmDel, setConfirmDel] = useState('')

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
        .then(() => {
            // console.log("Successfully updated your profile" + JSON.stringify(data));
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
            <DisplayProfile 
                errMsg={errMsg} isErrMsg={isErrMsg} confirmDel={confirmDel} 
                updateUserHandler={updateUserHandler} delAccountHandler={delAccountHandler} 
            />
        </>
    )
}

export default Profile;
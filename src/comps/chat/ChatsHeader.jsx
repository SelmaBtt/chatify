import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInContext } from '../../context/LogInContextProvider';
import { ConversationContext } from '../../context/ConversationContextProvider';
import { Link } from 'react-router-dom';
import styles from '../../styles/chat/ChatsHeader.module.css'
import placeholderAvatar from '../../assets/placeholderAvatar.jpg'

const ChatsHeader = () => {
    const { decodedJwt, setIsAuth } = useContext(LogInContext)
    const { setShowConversation } = useContext(ConversationContext)

    const navigate = useNavigate();

    // Handle modal window
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen); 

    const logoutHandler = () => {
        sessionStorage.clear();
        setIsAuth(false)
        setShowConversation(false)
        navigate('/log-in');
    }

    return(
        <header>
            <p>{decodedJwt.user}</p>
            <img
                style={{height: "50px"}} // DELETE LATER
                onClick={toggleModal}
                src={decodedJwt.avatar || placeholderAvatar}
                alt="Profile picture"
            />
            <div className={isOpen ? `${styles.modal} ${styles.openModal}` : `${styles.modal} ${styles.closedModal}`}>
                <ul>
                    <li>
                        <Link to={'/profile'}>Profile</Link>
                    </li>
                    <li onClick={logoutHandler}>Log out</li>
                </ul>
            </div>
            {isOpen && <div className={styles.overlay} onClick={toggleModal}></div>}
        </header>
    );
};

export default ChatsHeader;
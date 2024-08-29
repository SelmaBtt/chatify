import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInContext } from '../../context/LogInContextProvider';
import styles from '../../styles/chat/ChatsHeader.module.css'

const ChatsHeader = () => {
    const { decodedJwt, setIsAuth } = useContext(LogInContext)

    const navigate = useNavigate();

    // Handle modal window
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen); 

    const logoutHandler = () => {
        sessionStorage.clear();
        setIsAuth(false)
        navigate('/log-in');
    }

    return(
        <header>
            <p>{decodedJwt.user}</p>
            <img onClick={toggleModal} src={decodedJwt.avatar} alt="profile picture" />

            <div className={isOpen ? `${styles.modal} ${styles.openModal}` : `${styles.modal} ${styles.closedModal}`}>
                <ul>
                    <li>Settings</li>
                    <li onClick={logoutHandler}>Log out</li>
                </ul>
            </div>
            {isOpen && <div className={styles.overlay} onClick={toggleModal}></div>}
        </header>
    );
};

export default ChatsHeader;
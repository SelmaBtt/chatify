import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogInContext } from '../../context/LogInContextProvider';
import { ConversationContext } from '../../context/ConversationContextProvider';
import { Link } from 'react-router-dom';
import styles from '../../styles/chat/ChatsHeader.module.css'
import placeholderAvatar from '../../assets/placeholderAvatar.jpg'

const ChatsHeader = () => {
    const { decodedJwt, setIsAuth } = useContext(LogInContext)
    const { setShowConversation, setMessengerId } = useContext(ConversationContext)

    const navigate = useNavigate();

    // Handle modal window
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen); 

    const logoutHandler = () => {
        sessionStorage.clear();
        setIsAuth(false)
        setShowConversation(false)
        setMessengerId([])
        navigate('/log-in');
    }

    return(
        <header>
            <div className={styles.userWrapper}>
                <div className={styles.userContainer} onClick={toggleModal}>
                    <h2>{decodedJwt.user}</h2>
                    <img
                        className={styles.avatarIcon}
                        src={decodedJwt.avatar || placeholderAvatar}
                        alt="Profile picture"
                    />
                </div>
            </div>
            <div className={isOpen ? `${styles.modal} ${styles.openModal}` : `${styles.modal} ${styles.closedModal}`}>
                <hr />
                <ul className={styles.ul}>
                    <li onClick={() => navigate('/profile')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <mask id="mask0_2_49" maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
                            <rect width="34" height="34" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_2_49)">
                            <path d="M13.1044 31.1667L12.5377 26.6333C12.2308 26.5153 11.9415 26.3736 11.67 26.2083C11.3985 26.0431 11.1328 25.866 10.8731 25.6771L6.65853 27.4479L2.7627 20.7187L6.41061 17.9562C6.387 17.791 6.3752 17.6316 6.3752 17.4781V16.5219C6.3752 16.3684 6.387 16.209 6.41061 16.0437L2.7627 13.2812L6.65853 6.55208L10.8731 8.32291C11.1328 8.13402 11.4044 7.95694 11.6877 7.79166C11.971 7.62638 12.2544 7.48472 12.5377 7.36666L13.1044 2.83333H20.896L21.4627 7.36666C21.7696 7.48472 22.0589 7.62638 22.3304 7.79166C22.6019 7.95694 22.8676 8.13402 23.1273 8.32291L27.3419 6.55208L31.2377 13.2812L27.5898 16.0437C27.6134 16.209 27.6252 16.3684 27.6252 16.5219V17.4781C27.6252 17.6316 27.6016 17.791 27.5544 17.9562L31.2023 20.7187L27.3064 27.4479L23.1273 25.6771C22.8676 25.866 22.596 26.0431 22.3127 26.2083C22.0294 26.3736 21.746 26.5153 21.4627 26.6333L20.896 31.1667H13.1044ZM15.5835 28.3333H18.3814L18.8773 24.5792C19.6092 24.3903 20.288 24.1128 20.9137 23.7469C21.5394 23.3809 22.112 22.9382 22.6314 22.4187L26.1377 23.8708L27.5189 21.4625L24.4731 19.1604C24.5912 18.8299 24.6738 18.4816 24.721 18.1156C24.7682 17.7496 24.7919 17.3778 24.7919 17C24.7919 16.6222 24.7682 16.2503 24.721 15.8844C24.6738 15.5184 24.5912 15.1701 24.4731 14.8396L27.5189 12.5375L26.1377 10.1292L22.6314 11.6167C22.112 11.0736 21.5394 10.6191 20.9137 10.2531C20.288 9.88715 19.6092 9.60972 18.8773 9.42083L18.4169 5.66666H15.6189L15.1231 9.42083C14.3912 9.60972 13.7123 9.88715 13.0867 10.2531C12.461 10.6191 11.8884 11.0618 11.3689 11.5812L7.8627 10.1292L6.48145 12.5375L9.52728 14.8042C9.40922 15.1583 9.32658 15.5125 9.27936 15.8667C9.23214 16.2208 9.20853 16.5986 9.20853 17C9.20853 17.3778 9.23214 17.7437 9.27936 18.0979C9.32658 18.4521 9.40922 18.8062 9.52728 19.1604L6.48145 21.4625L7.8627 23.8708L11.3689 22.3833C11.8884 22.9264 12.461 23.3809 13.0867 23.7469C13.7123 24.1128 14.3912 24.3903 15.1231 24.5792L15.5835 28.3333ZM17.071 21.9583C18.4405 21.9583 19.6092 21.4743 20.5773 20.5062C21.5453 19.5382 22.0294 18.3694 22.0294 17C22.0294 15.6306 21.5453 14.4618 20.5773 13.4937C19.6092 12.5257 18.4405 12.0417 17.071 12.0417C15.678 12.0417 14.5033 12.5257 13.5471 13.4937C12.5908 14.4618 12.1127 15.6306 12.1127 17C12.1127 18.3694 12.5908 19.5382 13.5471 20.5062C14.5033 21.4743 15.678 21.9583 17.071 21.9583Z" fill="white" />
                            </g>
                        </svg>
                        Profile
                    </li>
                    <li onClick={logoutHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                            <mask id="mask0_2_60" maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
                            <rect width="34" height="34" fill="#D9D9D9" />
                            </mask>
                            <g mask="url(#mask0_2_60)">
                            <path d="M7.08333 29.75C6.30417 29.75 5.63715 29.4726 5.08229 28.9177C4.52743 28.3628 4.25 27.6958 4.25 26.9167V7.08333C4.25 6.30417 4.52743 5.63715 5.08229 5.08229C5.63715 4.52743 6.30417 4.25 7.08333 4.25H17V7.08333H7.08333V26.9167H17V29.75H7.08333ZM22.6667 24.0833L20.7188 22.0292L24.3312 18.4167H12.75V15.5833H24.3312L20.7188 11.9708L22.6667 9.91667L29.75 17L22.6667 24.0833Z" fill="white" />
                            </g>
                        </svg>
                        Log out
                    </li>
                </ul>
            </div>
            {isOpen && <div className={styles.overlay} onClick={toggleModal}></div>}
        </header>
    );
};

export default ChatsHeader;
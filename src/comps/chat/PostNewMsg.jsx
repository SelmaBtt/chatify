import { useContext } from 'react';
import { ConversationContext } from '../../context/ConversationContextProvider';
import styles from '../../styles/chat/PostNewMsg.module.css'

const PostNewMsg = () => {
    const { inputValue, newMessageHandler } = useContext(ConversationContext)
    

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            newMessageHandler();
        }
    };
    
    const handleBtn = () => {
        newMessageHandler();
    }

    return(
        <div className={styles.contentWrapper}>
            <input 
                className={styles.msgInput}
                type="text" 
                ref={inputValue}
                onKeyDown={handleKeyDown}
            />
            <svg className={styles.sendIcon} onClick={handleBtn}
                xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                <mask id="mask0_77_177" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="45" height="45">
                <rect width="45" height="45" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_77_177)">
                <path d="M5.625 37.5V7.5L41.25 22.5L5.625 37.5ZM9.375 31.875L31.5938 22.5L9.375 13.125V19.6875L20.625 22.5L9.375 25.3125V31.875Z" fill="#14141F"/>
                </g>
            </svg>
        </div>
    )
};

export default PostNewMsg;
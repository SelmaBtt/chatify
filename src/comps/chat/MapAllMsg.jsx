import { useContext, useEffect } from 'react';
import { LogInContext } from '../../context/LogInContextProvider';
import { ConversationContext } from '../../context/ConversationContextProvider';
import styles from '../../styles/chat/MapAllMsg.module.css';

const MapAllMsg = () => {
    const { decodedJwt } = useContext(LogInContext);
    const { getSelectedConversation, conversationId, messages, setMessages, delMessagesHandler, sentMsg, delMsg } = useContext(ConversationContext);

    // Get all messages logic
    useEffect(() => {
        getSelectedConversation()
    }, [sentMsg, delMsg, conversationId, setMessages]);

    return (
        <div>
            {(messages && messages.length > 0) ? (
                <div className={styles.messageWrapper}>
                    {messages.map((message, idx) => (
                        <div 
                            key={idx}
                            className={
                                message.userId === decodedJwt.id ? styles.myMessagesWrapper : styles.yourMessagesWrapper
                            }
                        >
                            <div 
                                className={
                                    message.userId === decodedJwt.id ? styles.myMessages : styles.yourMessages
                                }
                            >
                                <p>{message.text}</p>
                            </div>
                            <svg className={styles.deleteIcon} onClick={() => delMessagesHandler(message)}
                                xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <mask id="mask0_138_31" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                                <rect width="20" height="20" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_138_31)">
                                <path d="M7.8335 13.75L10.0002 11.5833L12.1668 13.75L13.3335 12.5833L11.1668 10.4167L13.3335 8.25L12.1668 7.08333L10.0002 9.25L7.8335 7.08333L6.66683 8.25L8.8335 10.4167L6.66683 12.5833L7.8335 13.75ZM5.8335 17.5C5.37516 17.5 4.9828 17.3368 4.65641 17.0104C4.33002 16.684 4.16683 16.2917 4.16683 15.8333V5H3.3335V3.33333H7.50016V2.5H12.5002V3.33333H16.6668V5H15.8335V15.8333C15.8335 16.2917 15.6703 16.684 15.3439 17.0104C15.0175 17.3368 14.6252 17.5 14.1668 17.5H5.8335ZM14.1668 5H5.8335V15.8333H14.1668V5Z" fill="#D36135"/>
                                </g>
                            </svg>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.noMsgWrapper}>
                    <h2>No messages found</h2>
                </div>
            )}
        </div>
    );
};

export default MapAllMsg;

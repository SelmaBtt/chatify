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
                                message.userId === decodedJwt.id ? styles.myMessages : styles.yourMessages
                            }
                        >
                            <p>{message.text}</p>
                            <button onClick={() => delMessagesHandler(message)}>↑ Delete message</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No messages found.</p>
            )}
        </div>
    );
};

export default MapAllMsg;

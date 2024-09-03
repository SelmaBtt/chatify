import { useContext, useEffect } from 'react';
import { LogInContext } from '../../context/LogInContextProvider';
import { ConversationContext } from '../../context/ConversationContextProvider';
import styles from '../../styles/chat/MapAllMsg.module.css';

const MapAllMsg = () => {
    const { decodedJwt } = useContext(LogInContext);
    const { conversationId, messages, setMessages, delMessagesHandler, sentMsg, delMsg } = useContext(ConversationContext);

    // Get all messages logic
    useEffect(() => {
        if (conversationId) {
            fetch(`${import.meta.env.VITE_API_URL}/messages?conversationId=${conversationId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
                    'Content-Type': 'application/json',
                },
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMessages(data);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        }
    }, [sentMsg, delMsg, conversationId, setMessages]);

    return (
        <div>
            {(messages && messages.length > 0) ? (
                <div className={styles.messageWrapper}>
                    {messages.map((message, idx) => (
                        <div
                            key={idx}
                            className={
                                message.userId === decodedJwt.id
                                    ? styles.myMessages
                                    : styles.yourMessages
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

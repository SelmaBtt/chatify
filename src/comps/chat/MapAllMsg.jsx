import { useContext, useEffect } from 'react';
import { LogInContext } from '../../context/LogInContextProvider';
import { ConversationContext } from '../../context/ConversationContextProvider';

const MapAllMsg = () => {
    const { decodedJwt } = useContext(LogInContext);
    const { conversationId, messages, setMessages, delMessagesHandler, sentMsg, delMsg, } = useContext(ConversationContext);

    // Get all messages logic
    useEffect(() => {
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
    }, [sentMsg, delMsg, conversationId]);

    return(
        <div>
            {(messages && messages.length > 0) ? (
                messages.map((message, idx) => (
                    <div key={idx}>
                        <h3>{decodedJwt.user}</h3>
                        <p>{message.text}</p> 
                        <button onClick={() => delMessagesHandler(message)}>↑ Delete message</button>
                    </div>
                ))
            ) : (
                <p>No messages found.</p>
            )}
        </div>
    )
};

export default MapAllMsg;
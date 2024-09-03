import { useContext, useEffect, useState } from 'react';
import { LogInContext } from '../../context/LogInContextProvider';
import { UsersContext } from '../../context/UsersContextProvider';
import { ConversationContext } from '../../context/ConversationContextProvider';

const MapAllMsg = () => {
    const { decodedJwt } = useContext(LogInContext);
    const { conversationDetails } = useContext(UsersContext);
    const { delMsg, setDelMsg, messages, setMessages, delMessagesHandler } = useContext(ConversationContext);

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
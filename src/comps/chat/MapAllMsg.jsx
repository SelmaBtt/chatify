import { useContext, useEffect, useState } from 'react';
import { LogInContext } from '../../context/LogInContextProvider';

const MapAllMsg = ({ sentMsg, delMsg, setDelMsg }) => {
    const { decodedJwt } = useContext(LogInContext);

    const [messages, setMessages] = useState([]);

    // Get all messages logic
    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + '/messages', {
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
    }, [sentMsg, delMsg]);

    // Del messages function
    const delMessagesHandler = (message) => {
        fetch(`${import.meta.env.VITE_API_URL}/messages/${message.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                console.error('Problem with deleting new message');
            }
            return response.json();
        })
        .then(data => {
            setDelMsg(prev => !prev);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });
    };

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
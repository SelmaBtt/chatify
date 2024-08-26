import { useContext, useState, useEffect } from 'react';
import styles from '../../styles/chat/Conversation.module.css'
import { DecodeJwtContext } from '../../context/DecodeJwtContextProvider';

const Conversation = () => {

    const { decodedJwt } = useContext(DecodeJwtContext)
    if (!decodedJwt) {
        return <p>Loading...</p>; // or some other loading indicator
    }

    // Fetching all messages

    const [messages, setMessages] = useState([])
    
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
    }, []);
    

    return(
        <div className={styles.container}>
            <header>
                <p>{decodedJwt.user}</p>
                <img src={decodedJwt.avatar} alt="profile picture" />
            </header>
            <hr />
            <div>
                {messages.length > 0 ? (
                    messages.map((message, idx) => (
                        <p key={idx}>{message.text}</p> 
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </div>
        </div>
    )
};

export default Conversation;
import { useContext, useState, useEffect, useRef } from 'react';
import styles from '../../styles/chat/Conversation.module.css'
import { DecodeJwtContext } from '../../context/DecodeJwtContextProvider';

const Conversation = () => {

    // const { decodedJwt } = useContext(DecodeJwtContext)
    const jwt = sessionStorage.getItem("token");
    const decodedJwt = JSON.parse(atob(jwt.split('.')[1]));

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

    // if (!decodedJwt) {
    //     return <p>Loading...</p>;
    // }
    console.log(decodedJwt)

    // Post message

    // const [newMessage, setNewMessage] = useState('')
    const inputValue = useRef()

    const newMessageHandler = () => {
        if (inputValue && inputValue.current.value.length > 0){
            const newMessage = inputValue.current.value;
            console.log(newMessage)

            fetch(import.meta.env.VITE_API_URL + '/messages', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: newMessage,
                    conversationId: null
                })
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Problem with posting new message');
                }
                return response.json();
            })
            // IF YOU WANT A USER RESPONSIVE MESSAGE
            // .then(data => {
            // })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        };
    };

    return(
        <div className={styles.container}>
            {/* Header section */}
            <header>
                <p>{decodedJwt.user}</p>
                <img src={decodedJwt.avatar} alt="profile picture" />
            </header>
            <hr />
            {/* Messages section */}
            <div>
                {(messages && messages.length > 0) ? (
                    messages.map((message, idx) => (
                        <>
                            <h3>{decodedJwt.user}</h3>
                            <p key={idx}>{message.text}</p> 
                        </>
                    ))
                ) : (
                    <p>No messages found.</p>
                )}
            </div>
            {/* Writing section */}
            <div>
                <input 
                    type="text" 
                    // onChange={(e) => setNewMessage(e.target.value)}
                    ref={inputValue}
                />
                <button onClick={newMessageHandler}>Send</button>

                {/* Test: {newMessage} */}
            </div>
        </div>
    )
};

export default Conversation;
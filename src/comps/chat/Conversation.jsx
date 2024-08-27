import { useContext, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/chat/Conversation.module.css'
import { LogInContext } from '../../context/LogInContextProvider';
import DOMPurify from "dompurify";

const Conversation = () => {

    const navigate = useNavigate();

    const { decodedJwt, setIsAuth } = useContext(LogInContext)

    const [messages, setMessages] = useState([])
    // const [isLoggedIn, setIsLoggedIn] = useState(true);
    
    const inputValue = useRef()
    const [sentMsg, setSentMsg] = useState(false); 
    const [delMsg, setDelMsg] = useState(false); 

    // Handle modal window
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(!isOpen); 



    // Fetching all messages
    
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

    // console.log(decodedJwt)

    // Post message

    const newMessageHandler = () => {
        if (inputValue && inputValue.current.value.length > 0){
            const newMessage = DOMPurify.sanitize(inputValue.current.value);
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
            .then(data => {
                setSentMsg(prev => !prev);
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        };
    };

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

    const logoutHandler = () => {
        sessionStorage.clear();
        setIsAuth(false)
        navigate('/log-in');
    }

    return(
        <div className={styles.container}>
            {/* Header section */}

            <header>
                <p>{decodedJwt.user}</p>
                <img onClick={toggleModal} src={decodedJwt.avatar} alt="profile picture" />

                <div className={isOpen ? `${styles.modal} ${styles.openModal}` : `${styles.modal} ${styles.closedModal}`}>
                    <ul>
                        <li>Settings</li>
                        <li onClick={logoutHandler}>Log out</li>
                    </ul>
                </div>
                {isOpen && <div className={styles.overlay} onClick={toggleModal}></div>}
            </header>
            <hr />

            {/* Messages section */}
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
            {/* Writing section */}
            <div>
                <input 
                    type="text" 
                    ref={inputValue}
                />
                <button onClick={newMessageHandler}>Send</button>
            </div>
        </div>
    )
};

export default Conversation;
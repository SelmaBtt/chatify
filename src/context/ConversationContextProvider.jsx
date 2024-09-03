import React, { createContext, useState, useEffect, useRef } from 'react';
import DOMPurify from "dompurify";

export const ConversationContext = createContext();

const ConversationContextProvider = (props) => {
    const [allConversations, setAllConversations] = useState([])
    
    const [sentMsg, setSentMsg] = useState(false); 
    const [delMsg, setDelMsg] = useState(false);
    
    const [messages, setMessages] = useState([]);
    const inputValue = useRef()

    // Get all conversations (conversationIds)
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/conversations`, {
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
            setAllConversations(data)
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        })
    }), [];

    // Get all messages logic
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/messages?conversationId=${allConversations}`, {
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

    // Post new messages
    const newMessageHandler = () => {
        if (inputValue && inputValue.current.value.length > 0){
            const newMessage = DOMPurify.sanitize(inputValue.current.value);
            console.log(newMessage)

            fetch(`${import.meta.env.VITE_API_URL}/messages?conversationId=${allConversations}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: newMessage,
                    conversationId: allConversations
                })
            })
            .then(response => {
                if (!response.ok) {
                    console.error('Problem with posting new message');
                }
                return response.json();
            })
            .then(() => {
                setSentMsg(prev => !prev);
                inputValue.current.value = "";
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        };
    };

    return(
        <ConversationContext.Provider value={{ 
            allConversations, 
            sentMsg, setSentMsg,
            delMsg, setDelMsg,
            messages, setMessages,
            delMessagesHandler,
            inputValue, newMessageHandler
        }}>
            {props.children}
        </ConversationContext.Provider>
    )
}
export default ConversationContextProvider;
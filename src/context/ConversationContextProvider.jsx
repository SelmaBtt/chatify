import React, { createContext, useState, useEffect, useRef } from 'react';
import DOMPurify from "dompurify";

export const ConversationContext = createContext();

const ConversationContextProvider = (props) => {
    const [allConversations, setAllConversations] = useState([])
    const [conversationId, setConversationId] = useState(null)
    const [showConversation, setShowConversation] = useState(false)
    
    const [sentMsg, setSentMsg] = useState(false); 
    const [delMsg, setDelMsg] = useState(false);
    
    const [messages, setMessages] = useState([]);
    const inputValue = useRef()

    // Get all conversations (conversationIds)
    const getConversations = () => {
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
            setAllConversations(data);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        })
    };

    const selectConversation = (conversationId) => {
        // TODO: fetch mot GET /messages?conversationId=${conversationId}
        // TODO: ersätt/uppdatera messages med resultatet av ovanstående fetch

        setConversationId(conversationId);
        setShowConversation(true);
    };

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
        .then(() => {
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

            // TODO: gör om nedanstående för query param finns bara för GET /messages
            fetch(`${import.meta.env.VITE_API_URL}/messages?conversationId=${conversationId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: newMessage,
                    conversationId: conversationId
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
            conversationId, setConversationId,
            getConversations,
            selectConversation,
            showConversation, setShowConversation, 
            sentMsg, setSentMsg,
            delMsg, setDelMsg,
            messages, setMessages,
            delMessagesHandler,
            inputValue, newMessageHandler,
        }}>
            {props.children}
        </ConversationContext.Provider>
    )
}
export default ConversationContextProvider;
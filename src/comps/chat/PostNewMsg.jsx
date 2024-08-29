import DOMPurify from "dompurify";
import { useRef } from 'react';

const PostNewMsg = ({ setSentMsg }) => {
    const inputValue = useRef()

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
                inputValue.current.value = "";
            })
            .catch(error => {
                console.error('There was a problem with your fetch operation:', error);
            });
        };
    };

    return(
        <div>
            <input 
                type="text" 
                ref={inputValue}
            />
            <button onClick={newMessageHandler}>Send</button>
        </div>
    )
};

export default PostNewMsg;
import { useContext } from 'react';
import { ConversationContext } from '../../context/ConversationContextProvider';

const PostNewMsg = () => {
    const { inputValue, newMessageHandler } = useContext(ConversationContext)
    

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            newMessageHandler();
        }
    };
    
    const handleBtn = () => {
        newMessageHandler();
    }

    return(
        <div>
            <input 
                type="text" 
                ref={inputValue}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleBtn}>Send</button>
        </div>
    )
};

export default PostNewMsg;
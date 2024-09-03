import { useContext } from 'react';
import { LogInContext } from "../../context/LogInContextProvider";
import { UsersContext } from "../../context/UsersContextProvider";
import { ConversationContext } from '../../context/ConversationContextProvider';

const PostNewMsg = ({ setSentMsg }) => {
    const { decodedJwt } = useContext(LogInContext);
    const { invitationDetailsHandler } = useContext(UsersContext);
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
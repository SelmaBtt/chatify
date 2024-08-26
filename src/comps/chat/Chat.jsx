import AllChats from "./AllChats";
import Conversation from "./Conversation";
import styles from '../../styles/chat/Chat.module.css'

const Chat = () => {
    return(
        <div className={styles.mainContainer}>
            <AllChats />
            <Conversation />
        </div>
    )
}

export default Chat;
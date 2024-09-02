import Sidebar from "./SideBar";
import Conversation from "./Conversation";
import styles from '../../styles/chat/Chat.module.css'

const Chat = () => {
    return(
        <div className={styles.mainContainer}>
            <Sidebar />
            <Conversation />
        </div>
    )
}

export default Chat;
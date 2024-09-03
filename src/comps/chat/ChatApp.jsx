import Sidebar from "./SideBar";
import ChatLandingPage from "./ChatLandingPage";
import Conversation from "./Conversation";
import styles from '../../styles/chat/ChatApp.module.css'
import ChatsHeader from "./ChatsHeader";
import { useContext } from "react";
import { ConversationContext } from "../../context/ConversationContextProvider";

const ChatApp = () => {
    const { showConversation } = useContext(ConversationContext)

    return(
        <div className={styles.mainContainer}>
            <Sidebar />
            <div>
                <ChatsHeader />
                <hr />
                {showConversation ? (
                    <Conversation />
                ) : (
                    <ChatLandingPage />
                )}
            </div>
        </div>
    )
}

export default ChatApp;
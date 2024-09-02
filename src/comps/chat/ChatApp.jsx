import Sidebar from "./SideBar";
import ChatLandingPage from "./ChatLandingPage";
import Conversation from "./Conversation";
import styles from '../../styles/chat/ChatApp.module.css'
import ChatsHeader from "./ChatsHeader";
import { useState } from "react";

const ChatApp = () => {
    const [showConversation, setShowConversation] = useState(false)

    return(
        <div className={styles.mainContainer}>
            <Sidebar setShowConversation={setShowConversation} />
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
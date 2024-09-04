import Sidebar from "./SideBar";
import ChatLandingPage from "./ChatLandingPage";
import Conversation from "./Conversation";
import styles from '../../styles/chat/ChatApp.module.css'
import ChatsHeader from "./ChatsHeader";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContextProvider";
import { ConversationContext } from "../../context/ConversationContextProvider";

const ChatApp = () => {
    const { isInviteResponse } = useContext(UsersContext)
    const { showConversation } = useContext(ConversationContext)

    return(
        <div className={styles.mainContainer}>
            {isInviteResponse && 
                <div>
                    <p>Invite sent!</p>
                </div>
            }
            <Sidebar />
            <div className={styles.contentContainer}>
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
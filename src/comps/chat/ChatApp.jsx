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
                <div className={styles.inviteModal}>
                    <h2>Invite sent!</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <mask id="mask0_83_57" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34">
                            <rect width="34" height="34" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_83_57)">
                            <path d="M17.0002 31.1667C15.0404 31.1667 13.1988 30.7948 11.4752 30.051C9.75155 29.3073 8.25225 28.2979 6.97725 27.0229C5.70225 25.7479 4.69287 24.2486 3.94912 22.525C3.20537 20.8014 2.8335 18.9597 2.8335 17C2.8335 15.0403 3.20537 13.1986 3.94912 11.475C4.69287 9.75138 5.70225 8.25208 6.97725 6.97708C8.25225 5.70208 9.75155 4.6927 11.4752 3.94895C13.1988 3.2052 15.0404 2.83333 17.0002 2.83333C18.5349 2.83333 19.987 3.05763 21.3564 3.50624C22.7259 3.95486 23.9891 4.58055 25.146 5.38333L23.0918 7.47291C22.1946 6.90625 21.2384 6.46354 20.2231 6.14479C19.2078 5.82604 18.1335 5.66666 17.0002 5.66666C13.8599 5.66666 11.1859 6.77048 8.97829 8.97812C6.77065 11.1858 5.66683 13.8597 5.66683 17C5.66683 20.1403 6.77065 22.8142 8.97829 25.0219C11.1859 27.2295 13.8599 28.3333 17.0002 28.3333C17.7557 28.3333 18.4877 28.2625 19.196 28.1208C19.9043 27.9792 20.5891 27.7785 21.2502 27.5187L23.3752 29.6792C22.4071 30.1514 21.3918 30.5174 20.3293 30.7771C19.2668 31.0368 18.1571 31.1667 17.0002 31.1667ZM26.9168 28.3333V24.0833H22.6668V21.25H26.9168V17H29.7502V21.25H34.0002V24.0833H29.7502V28.3333H26.9168ZM15.0168 23.5167L8.996 17.4958L10.9793 15.5125L15.0168 19.55L29.1835 5.34791L31.1668 7.33124L15.0168 23.5167Z" fill="white" />
                        </g>
                    </svg>
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
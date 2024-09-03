import styles from '../../styles/Chat/Sidebar.module.css'
import { useState, useContext } from 'react';
import { LogInContext } from '../../context/LogInContextProvider';
import { UsersContext } from '../../context/UsersContextProvider';
import { ConversationContext } from '../../context/ConversationContextProvider';


const SideBar = () => {
    const { decodedJwt } = useContext(LogInContext);
    const { users, isInviteResponse, getAllUsers, inviteHandler, invitationDetailsHandler } = useContext(UsersContext)
    const { setShowConversation, allConversations, selectConversation } = useContext(ConversationContext)
    
    const [searchValue, setSearchValue] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);

    // Button handler for fetching all users and toggle window
    const btnHandler = () => {
        toggleSearch();
        getAllUsers();
    };

    // Search window handling
    const [isOpen, setIsOpen] = useState(false);
    const toggleSearch = () => {
        setIsOpen(!isOpen);
        setSearchValue('');
        setSearchedUsers([]);
    };

    // To be able to search for specific user
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchHandler();
        }
    };
    const searchHandler = () => {
        if (users && users.length > 0) {
            const filteredUsers = users.filter(user =>
                user.username.toLowerCase().includes(searchValue.toLowerCase())
            );
            setSearchedUsers(filteredUsers);
        }
    }

    // To make the decodedJwt, which is a string, to a array 
    const inviteArray = JSON.parse(decodedJwt.invite);

    const openConvoHanlder = (convo) => {
        selectConversation(convo)
        setShowConversation(true);
    }

    return(
        <div className={styles.container}>

            {isInviteResponse && 
                <div>
                    <p>Invite sent!</p>
                </div>
            }

            <h1>Chatify</h1>
            <button onClick={btnHandler}>
                <h2>{isOpen ? "Close" : "Add user"}</h2>
            </button> 

            <div className={isOpen ? `${styles.searchWindow} ${styles.openSearchWindow}` : `${styles.searchWindow} ${styles.closedSearchWindow}`}>
                <input 
                    type="text" 
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value) }} 
                    onKeyDown={handleKeyDown}
                />
                <button onClick={searchHandler}>Search</button>
                
                {/* Display users */}
                {(searchedUsers && searchedUsers.length > 0) ? (
                    searchedUsers.map((searchedUser, idx) => (
                        <div key={idx}>
                            <p>{searchedUser.username}</p>
                            <button onClick={() => inviteHandler(searchedUser.userId)}>Invite user</button>
                        </div>
                    ))
                ) : (
                    users.map((user, idx) => (
                        <div key={idx}>
                            <p>{user.username}</p>
                            <button onClick={() => inviteHandler(user.userId)}>Invite user</button>
                        </div>
                    ))
                )}

            </div>

            {Array.isArray(inviteArray) && inviteArray.length > 0 &&
                <div>
                    <h2>Invitations</h2>
                    {inviteArray.map((invite, idx) => (
                        <div key={idx} onClick={() => {openConvoHanlder(invite.conversationId)}}>
                            <p>{invite.username}</p>
                        </div>
                    ))}
                </div>
            }
            
            <div>
                <h2>Your chats</h2>
                {allConversations.map((conv, idx) => (
                    <div key={idx} onClick={() => openConvoHanlder(conv)}>Konversation {idx + 1}</div>
                ))}
            </div>
        </div>
    )
};

export default SideBar;
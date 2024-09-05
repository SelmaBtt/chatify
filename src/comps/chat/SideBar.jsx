import styles from '../../styles/Chat/Sidebar.module.css'
import { useState, useContext, useEffect } from 'react';
import { LogInContext } from '../../context/LogInContextProvider';
import { UsersContext } from '../../context/UsersContextProvider';
import { ConversationContext } from '../../context/ConversationContextProvider';


const SideBar = () => {
    const { decodedJwt } = useContext(LogInContext);
    const { users, /* user, */
        getAllUsers, inviteHandler, 
        searchValue, setSearchValue,
        searchedUsers, setSearchedUsers,
        // getOneUser,
    } = useContext(UsersContext)
    const { /* messengerId, */ setShowConversation, allConversations, /* getAllConversations, */ selectConversation, getConversationIds } = useContext(ConversationContext)
    
    // useEffect(() => {
        //     console.log("messengerId updated:", messengerId);
        //     getOneUser(messengerId)
        // }, [messengerId])
        
        // allConversations.map(conv => {
        //     getAllConversations(conv);
        // });
                  
    useEffect(() => {
        getConversationIds()
    }, [inviteHandler])

    // Search window handling
    const [isOpen, setIsOpen] = useState(false);
    const toggleSearch = () => {
        setIsOpen(!isOpen);
        setSearchValue('');
        setSearchedUsers([]);
    };
    
    // Button handler for fetching all users and toggle window
    const btnHandler = () => {
        toggleSearch();
        getAllUsers();
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
    const inviteArr = JSON.parse(decodedJwt.invite);
    let inviteArray = []

    if(inviteArr){
        inviteArray = inviteArr.reduce((inv, current) => {
            let exists = null;
            if (current.username) exists = inv.find(item => item.username === current.username);
            if (!exists) inv.push(current);
            return inv;
        }, [])
    }

    const openConvoHanlder = (convo) => {
        // console.log(convo)
        selectConversation(convo);
        setShowConversation(true);
    }

    return(
        <div className={styles.container}>

            <h1>Chatify</h1>

            <div onClick={btnHandler} className={!isOpen && `${styles.searchClosedContainer}`}>
                {isOpen ? (
                    ""
                    ) : (
                        <>
                            <h2>Add user</h2>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <mask id="mask0_104_3" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                                    <rect width="24" height="24" fill="#D9D9D9"/>
                                </mask>
                                <g mask="url(#mask0_104_3)">
                                    <path d="M18 14V11H15V9H18V6H20V9H23V11H20V14H18ZM9 12C7.9 12 6.95833 11.6083 6.175 10.825C5.39167 10.0417 5 9.1 5 8C5 6.9 5.39167 5.95833 6.175 5.175C6.95833 4.39167 7.9 4 9 4C10.1 4 11.0417 4.39167 11.825 5.175C12.6083 5.95833 13 6.9 13 8C13 9.1 12.6083 10.0417 11.825 10.825C11.0417 11.6083 10.1 12 9 12ZM1 20V17.2C1 16.6333 1.14583 16.1125 1.4375 15.6375C1.72917 15.1625 2.11667 14.8 2.6 14.55C3.63333 14.0333 4.68333 13.6458 5.75 13.3875C6.81667 13.1292 7.9 13 9 13C10.1 13 11.1833 13.1292 12.25 13.3875C13.3167 13.6458 14.3667 14.0333 15.4 14.55C15.8833 14.8 16.2708 15.1625 16.5625 15.6375C16.8542 16.1125 17 16.6333 17 17.2V20H1ZM3 18H15V17.2C15 17.0167 14.9542 16.85 14.8625 16.7C14.7708 16.55 14.65 16.4333 14.5 16.35C13.6 15.9 12.6917 15.5625 11.775 15.3375C10.8583 15.1125 9.93333 15 9 15C8.06667 15 7.14167 15.1125 6.225 15.3375C5.30833 15.5625 4.4 15.9 3.5 16.35C3.35 16.4333 3.22917 16.55 3.1375 16.7C3.04583 16.85 3 17.0167 3 17.2V18ZM9 10C9.55 10 10.0208 9.80417 10.4125 9.4125C10.8042 9.02083 11 8.55 11 8C11 7.45 10.8042 6.97917 10.4125 6.5875C10.0208 6.19583 9.55 6 9 6C8.45 6 7.97917 6.19583 7.5875 6.5875C7.19583 6.97917 7 7.45 7 8C7 8.55 7.19583 9.02083 7.5875 9.4125C7.97917 9.80417 8.45 10 9 10Z" fill="white"/>
                                </g>
                            </svg>
                        </>
                    )
                }
            </div>

            <div className={isOpen ? `${styles.searchWindow} ${styles.openSearchWindow}` : `${styles.searchWindow} ${styles.closedSearchWindow}`}>
                <svg onClick={btnHandler} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <mask id="mask0_104_3" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                        <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_104_3)">
                        <path d="M18 14V11H15V9H18V6H20V9H23V11H20V14H18ZM9 12C7.9 12 6.95833 11.6083 6.175 10.825C5.39167 10.0417 5 9.1 5 8C5 6.9 5.39167 5.95833 6.175 5.175C6.95833 4.39167 7.9 4 9 4C10.1 4 11.0417 4.39167 11.825 5.175C12.6083 5.95833 13 6.9 13 8C13 9.1 12.6083 10.0417 11.825 10.825C11.0417 11.6083 10.1 12 9 12ZM1 20V17.2C1 16.6333 1.14583 16.1125 1.4375 15.6375C1.72917 15.1625 2.11667 14.8 2.6 14.55C3.63333 14.0333 4.68333 13.6458 5.75 13.3875C6.81667 13.1292 7.9 13 9 13C10.1 13 11.1833 13.1292 12.25 13.3875C13.3167 13.6458 14.3667 14.0333 15.4 14.55C15.8833 14.8 16.2708 15.1625 16.5625 15.6375C16.8542 16.1125 17 16.6333 17 17.2V20H1ZM3 18H15V17.2C15 17.0167 14.9542 16.85 14.8625 16.7C14.7708 16.55 14.65 16.4333 14.5 16.35C13.6 15.9 12.6917 15.5625 11.775 15.3375C10.8583 15.1125 9.93333 15 9 15C8.06667 15 7.14167 15.1125 6.225 15.3375C5.30833 15.5625 4.4 15.9 3.5 16.35C3.35 16.4333 3.22917 16.55 3.1375 16.7C3.04583 16.85 3 17.0167 3 17.2V18ZM9 10C9.55 10 10.0208 9.80417 10.4125 9.4125C10.8042 9.02083 11 8.55 11 8C11 7.45 10.8042 6.97917 10.4125 6.5875C10.0208 6.19583 9.55 6 9 6C8.45 6 7.97917 6.19583 7.5875 6.5875C7.19583 6.97917 7 7.45 7 8C7 8.55 7.19583 9.02083 7.5875 9.4125C7.97917 9.80417 8.45 10 9 10Z" fill="white"/>
                    </g>
                </svg>
                <input 
                    className={styles.searchInput}
                    type="text" 
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value) }} 
                    onKeyDown={handleKeyDown}
                />
                <button onClick={searchHandler} className={styles.searchBtn}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <mask id="mask0_77_83" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                            <rect width="24" height="24" fill="#D9D9D9"/>
                        </mask>
                        <g mask="url(#mask0_77_83)">
                            <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="#1C1B1F"/>
                        </g>
                    </svg>
                </button>
                
                {/* Display users */}
                <div className={styles.displaySearchedWrapper}>
                    {searchedUsers && searchedUsers.length > 0 &&
                        searchedUsers.map((searchedUser, idx) => (
                            <div key={idx} className={styles.serachedListItem}>
                                <p>{searchedUser.username}</p>
                                <button onClick={() => inviteHandler(searchedUser.userId)}>Invite user</button>
                            </div>
                        ))
                    }
                </div>

            </div>
            
            <div>
                <div className={styles.titleDiv}>
                    <h2>Your chats</h2> <hr />
                </div>
                <div>
                    {Array.isArray(inviteArray) && inviteArray.length > 0 &&
                        inviteArray.map((invite, idx) => (
                            <div className={styles.chatsList} key={idx} onClick={() => {openConvoHanlder(invite.conversationId)}}>
                                <p>{invite.username}</p>
                            </div>
                        ))
                    }
                    
                    {allConversations.map((conv, idx) => (
                        <div className={styles.chatsList} key={idx} onClick={() => openConvoHanlder(conv)}>
                            Conversation {idx + 1}
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
};

export default SideBar;
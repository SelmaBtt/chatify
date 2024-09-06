import { useState, useContext, useEffect } from 'react';
import { LogInContext } from '../../context/LogInContextProvider';
import { UsersContext } from '../../context/UsersContextProvider';
import { ConversationContext } from '../../context/ConversationContextProvider';
import DisplaySideBar from './DisplaySideBar';


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
        <>
            <DisplaySideBar 
                isOpen={isOpen} btnHandler={btnHandler} 
                handleKeyDown={handleKeyDown} searchHandler={searchHandler}
                inviteArray={inviteArray} openConvoHanlder={openConvoHanlder}
            />
        </>
    )
};

export default SideBar;
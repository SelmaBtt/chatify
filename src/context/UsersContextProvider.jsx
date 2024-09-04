import React, { createContext, useState, useEffect } from 'react';

export const UsersContext = createContext();

const UsersContextProvider = (props) => {

    const [guid, setGuid] = useState('');

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);

    const [isInviteResponse, setIsInviteResponse] = useState(false);

    const [searchValue, setSearchValue] = useState('');
    const [searchedUsers, setSearchedUsers] = useState([]);

    // Generate GUID
    useEffect(() => {
        generateGuid();
    }, []);

    const generateGuid = () => {
        const newGuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => 
            (c === 'x' ? Math.floor(Math.random() * 16) : (Math.floor(Math.random() * 4) + 8)).toString(16)
        );
        setGuid(newGuid);
    };

    // Get all users
    const getAllUsers = () => {
        fetch(import.meta.env.VITE_API_URL + '/users', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                console.error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setUsers(data)
            console.log(user)
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        })
    }

    // Get one user
    // ATTEMPT to display username on sidebar
    // const getOneUser = (userId) => {
    //     if(userId > 0 && userId !== user?.id){
    //         fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 console.error('Network response was not ok');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setUser(data)
    //             console.log(data)
    //         })
    //         .catch(error => {
    //             console.error('There was a problem with your fetch operation:', error);
    //         })
    //     }
    // }

    // Invite users
    const inviteHandler = (userId) => {
        console.log(`Got user id for user id: ${userId}`)
        if (!guid) {
            console.error('GUID is not generated or is empty');
            return;
        }
        
        fetch(`${import.meta.env.VITE_API_URL}/invite/${userId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                conversationId: guid,
            })
        })
        .then(response => {
            if (!response.ok) {
                console.error('Problem with inviting user');
            }
            return response.json();
        })
        .then(() => {
            setIsInviteResponse(true);
            setTimeout(() => {
                setIsInviteResponse(false);
            }, 3000);
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        })
        .finally (() => {
            // Reset guid value and everything
            generateGuid();
            setSearchValue('');
            setSearchedUsers([]);
        })
    };

    // IS THIS NEEDED?
    // const invitationDetailsHandler = (convoDetails) => {
    //     setConversationDetails(convoDetails)

    //     // console log the values before sessisonStorage
    //     console.log(conversationDetails)

    //     // console log the values after sessisonStorage
    //     // IS THIS NEEDED?
    //     // sessionStorage.setItem('conversationDetails', JSON.stringify(convoDetails));
    //     // console.log('Stored conversationDetails:', sessionStorage.getItem("conversationDetails"));
    // };

    return(
        <UsersContext.Provider value={{ 
            users, 
            // user, getOneUser,
            isInviteResponse,
            getAllUsers, inviteHandler,
            searchValue, setSearchValue,
            searchedUsers, setSearchedUsers,

        }}>
            {props.children}
        </UsersContext.Provider>
    )
}
export default UsersContextProvider;
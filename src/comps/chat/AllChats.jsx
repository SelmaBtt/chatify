import styles from '../../styles/Chat/AllChats.module.css'
import { useState } from 'react';

const AllChats = () => {
    // PUT A USEEFFECT OR SOMETHING SO IT CAN REGENERATE 
    const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => (c === 'x' ? Math.floor(Math.random() * 16) : (Math.floor(Math.random() * 4) + 8)).toString(16));

    const [users, setUsers] = useState([]);

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
    }

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
            toggleSearch()
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        })
    }

    const inviteHandler = (userId) => {
        console.log(userId)

        // fetch(`${import.meta.env.VITE_API_URL}/invite/${userId}`, {
        //     method: 'POST',
        //     headers: {
        //         Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         conversationId: guid,
        //     })
        // })
        // .then(response => {
        //     if (!response.ok) {
        //         console.error('Problem with inviting user');
        //     }
        //     return response.json();
        // })
        // .then(data => {
        // })
        // .catch(error => {
        //     console.error('There was a problem with your fetch operation:', error);
        // });
        // .finally (() => {
        //     toggleSearch();
        //     setSearchValue('');
        //     setSearchedUsers([]);
        // })
    };

    // To be able to search for specific user
    const searchHandler = () => {
        if (users && users.length > 0) {
            const filteredUsers = users.filter(user =>
                user.username.toLowerCase().includes(searchValue.toLowerCase())
            );
            setSearchedUsers(filteredUsers);
        }
    }

    return(
        <div className={styles.container}>
            <h1>Chatify</h1>
            <button onClick={btnHandler}>
                <h2>{isOpen ? "Close" : "Add user"}</h2>
            </button> 

            <div className={isOpen ? `${styles.searchWindow} ${styles.openSearchWindow}` : `${styles.searchWindow} ${styles.closedSearchWindow}`}>
                <input 
                    type="text" 
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value) }} 
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
            <h2>Your chats</h2>
        </div>
    )
};

export default AllChats;
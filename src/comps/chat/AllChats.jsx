import styles from '../../styles/Chat/AllChats.module.css'

const AllChats = () => {
    return(
        <div className={styles.container}>
            <h1>Chatify</h1>
            <button><h2>Add users</h2></button>
            <h2>Your chats</h2>
        </div>
    )
};

export default AllChats;
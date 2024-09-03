import { useState } from 'react';
import styles from '../../styles/chat/Conversation.module.css'
import ChatsHeader from './ChatsHeader';
import PostNewMsg from './PostNewMsg';
import MapAllMsg from './MapAllMsg';

const Conversation = () => {
    return(
        <div className={styles.container}>
            {/* Messages section */}
            <MapAllMsg />

            {/* Writing section */}
            <PostNewMsg />
            
        </div>
    )
};

export default Conversation;
import { useState } from 'react';
import styles from '../../styles/chat/Conversation.module.css'
import ChatsHeader from './ChatsHeader';
import PostNewMsg from './PostNewMsg';
import MapAllMsg from './MapAllMsg';

const Conversation = () => {

    const [sentMsg, setSentMsg] = useState(false); 
    const [delMsg, setDelMsg] = useState(false); 

    return(
        <div className={styles.container}>
            {/* Messages section */}
            <MapAllMsg sentMsg={sentMsg} delMsg={delMsg} setDelMsg={setDelMsg} />

            {/* Writing section */}
            <PostNewMsg setSentMsg={setSentMsg} delMsg={delMsg} />
            
        </div>
    )
};

export default Conversation;
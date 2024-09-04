import styles from '../../styles/chat/Conversation.module.css'
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
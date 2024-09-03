import { Link } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css'

const LandingPage = () => {
    return(
        <div className='containerBase'>
            <div className={`${styles.contentWrapper} contentWrapperBase`}>
                <h1>
                    <span className={styles.welcomeText}>Welcome to</span> Chatify
                </h1>
                <hr />
                <div className={styles.btnWrapper}>
                    <Link to={'/log-in'}>
                        <button>
                            Log in
                        </button>
                    </Link>
                    <Link to={'/register'}>
                        <button>
                            Register
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
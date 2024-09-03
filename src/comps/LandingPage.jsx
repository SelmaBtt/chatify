import { Link } from 'react-router-dom';
import styles from '../styles/LandingPage.module.css'

const LandingPage = () => {
    return(
        <div className={styles.container}>
            <div className={`${styles.contentWrapper} contentWrapperBase`}>
                <h1>
                    Welcome to <span className='logo'>Chatify</span>
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
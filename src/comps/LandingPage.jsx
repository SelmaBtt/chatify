import { Link } from 'react-router-dom';

const LandingPage = () => {
    return(
        <>
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
        </>
    )
}

export default LandingPage;
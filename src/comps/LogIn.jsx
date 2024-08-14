import { Link } from 'react-router-dom';

const LogIn = () => {
    return(
        <>
            <Link to={'/'}>Home</Link>  
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Password" />
            <button>Log in</button>
        </>
    )
}

export default LogIn;
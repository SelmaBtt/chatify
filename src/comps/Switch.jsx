import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LogIn from './LogIn';
import Register from './Register';

const Switch = () => {
    return(
        <>
            <Routes>
                <Route path='/' exact element={<LandingPage />}></Route>
                <Route path='/log-in' element={<LogIn />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
        </>
    )
}

export default Switch;
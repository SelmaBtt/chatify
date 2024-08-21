import { Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import LogIn from './LogIn';
import RegisterLogic from './Register/RegisterLogic';

const Switch = () => {
    return(
        <>
            <Routes>
                <Route path='/' exact element={<LandingPage />}></Route>
                <Route path='/log-in' element={<LogIn />}></Route>
                <Route path='/register' element={<RegisterLogic />}></Route>
            </Routes>
        </>
    )
}

export default Switch;
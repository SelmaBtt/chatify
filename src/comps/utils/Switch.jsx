import { Routes, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';
import LogIn from '../LogIn';
import RegisterLogic from '../register/RegisterLogic';
import ProtectedRoute from './ProtectedRoutes';
import Chat from '../Chat';

const Switch = () => {
    return(
        <>
            <Routes>
                <Route path='/' exact element={<LandingPage />} />
                <Route path='/log-in' element={<LogIn />} />
                <Route path='/register' element={<RegisterLogic />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path='/chat' element={<Chat />} />
                </Route>
            </Routes>
        </>
    )
}

export default Switch;
import { Routes, Route } from 'react-router-dom';
import LandingPage from '../LandingPage';
import LogIn from '../LogIn';
import RegisterLogic from '../Register/RegisterLogic';
import ProtectedRoute from './ProtectedRoutes';
import ChatApp from '../chat/ChatApp';
import Profile from '../profile/Profile';

const Switch = () => {
    return(
        <>
            <Routes>
                <Route path='/' exact element={<LandingPage />} />
                <Route path='/log-in' element={<LogIn />} />
                <Route path='/register' element={<RegisterLogic />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path='/chat' element={<ChatApp />} />
                    <Route path='/profile' element={<Profile />} />
                </Route>
            </Routes>
        </>
    )
}

export default Switch;
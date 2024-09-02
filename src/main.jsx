import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './comps/App.jsx'
import './styles/root.css'
import LogInContextProvider from './context/LogInContextProvider.jsx';
import UsersContextProvider from './context/UsersContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <UsersContextProvider>
    <LogInContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LogInContextProvider>
  </UsersContextProvider>
)

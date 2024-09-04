import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './comps/App.jsx'
import './styles/root.css'
import LogInContextProvider from './context/LogInContextProvider.jsx';
import UsersContextProvider from './context/UsersContextProvider.jsx';
import ConversationContextProvider from './context/ConversationContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <LogInContextProvider>
    <ConversationContextProvider>
      <UsersContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
      </UsersContextProvider>
    </ConversationContextProvider>
  </LogInContextProvider>
)

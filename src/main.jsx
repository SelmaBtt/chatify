import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './comps/App.jsx'
import './styles/root.css'
import LogInContextProvider from './context/LogInContextProvider.jsx';
import DecodeJwtContextProvider from './context/DecodeJwtContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <LogInContextProvider>
  <DecodeJwtContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </DecodeJwtContextProvider>
  </LogInContextProvider>
)

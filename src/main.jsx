import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './comps/App.jsx'
import './styles/root.css'
import LogInContextProvider from './context/LogInContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <LogInContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LogInContextProvider>
)

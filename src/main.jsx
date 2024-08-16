import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './comps/App.jsx'
import './styles/root.css'
import RegisterContextProvider from './comps/context/RegisterContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <RegisterContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RegisterContextProvider>
)

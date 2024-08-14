import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './comps/App.jsx'
import './styles/root.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

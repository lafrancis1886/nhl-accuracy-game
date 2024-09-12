import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import NHLAccuracyApp from './NHLAccuracyApp.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NHLAccuracyApp />
  </StrictMode>,
)

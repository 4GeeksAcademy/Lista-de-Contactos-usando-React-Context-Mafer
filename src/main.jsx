import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ContactsProvider } from '../src/ContactsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ContactsProvider>
                <App />
            </ContactsProvider>
        </BrowserRouter>
    </React.StrictMode>
)
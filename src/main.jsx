import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import { ContactsProvider } from './ContactsContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <ContactsProvider>
                <App />
            </ContactsProvider>
        </Router>
    </React.StrictMode>
)
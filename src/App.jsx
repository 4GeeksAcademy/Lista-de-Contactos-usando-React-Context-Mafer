import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import Contacts from './Contacts.jsx'
import AddContact from './AddContact.jsx'
import ConfirmModal from './ConfirmModal.jsx' // Modal global

export default function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="header card">
        <h1 style={{ fontSize: 18, margin: 0 }}>Contact List</h1>
        {pathname === '/' ? (
          <button className="btn btn-success" onClick={() => navigate('/add')}>
            Add new contact
          </button>
        ) : (
          <Link to="/" className="btn btn-ghost">← Back to contacts</Link>
        )}
      </div>

      <Routes>
        <Route path="/" element={<Contacts />} />
        <Route path="/add" element={<AddContact />} />
        <Route path="/edit/:id" element={<AddContact />} />
      </Routes>

      {/* El modal se muestra si el contexto tiene confirm */}
      <ConfirmModal />

      <div className="footer-space" />
    </div>
  )
}
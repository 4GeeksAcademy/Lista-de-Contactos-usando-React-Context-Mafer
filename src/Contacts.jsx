import { useContacts } from './ContactsContext.jsx'
import ContactCard from './ContactCard.jsx'

export default function Contacts() {
  const { contacts, loading, error } = useContacts()

  return (
    <div className="list card">
      {loading && (
        <div className="row"><span style={{ color: '#6b7280' }}>Cargando contactos...</span></div>
      )}
      {error && (
        <div className="row"><span style={{ color: '#ef4444' }}>{error}</span></div>
      )}
      {!loading && !contacts.length && (
        <div className="row"><span style={{ color: '#6b7280' }}>No hay contactos aún. Crea el primero con “Add new contact”.</span></div>
      )}
      {contacts.map(c => <ContactCard key={c.id} contact={c} />)}
    </div>
  )
}
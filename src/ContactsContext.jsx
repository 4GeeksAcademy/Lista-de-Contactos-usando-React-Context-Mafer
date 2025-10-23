import React from 'react'

const ContactsContext = React.createContext()
export const useContacts = () => React.useContext(ContactsContext)

const API_BASE = 'https://Playground.4geeks.com/contact'
const AGENDA_SLUG = 'my_super_agenda' // cámbialo si quieres un slug propio

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [confirm, setConfirm] = React.useState(null) // {id, name} para el modal

  React.useEffect(() => {
    bootstrap()
  }, [])

  async function bootstrap() {
    setLoading(true)
    try {
      await ensureAgendaExists()
      await fetchContacts()
    } catch (err) {
      console.error(err)
      setError('No fue posible cargar los contactos.')
    } finally {
      setLoading(false)
    }
  }

  async function ensureAgendaExists() {
    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`)
    if (res.ok) return true
    if (res.status === 404) {
      const create = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`, { method: 'POST' })
      if (!create.ok) throw new Error('No se pudo crear la agenda.')
      return true
    }
    throw new Error('Error al verificar la agenda.')
  }

  async function fetchContacts() {
    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`)
    if (!res.ok) throw new Error('Error obteniendo contactos')
    const data = await res.json() // { contacts: [...] }
    setContacts(data.contacts || [])
  }

  async function addContact(payload) {
    // payload: { name, email, phone, address }
    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!res.ok) throw new Error('Error creando contacto')
    const created = await res.json()
    setContacts(prev => [created, ...prev])
    return created
  }

  async function updateContact(id, payload) {
    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload) // API permite actualización atómica
    })
    if (!res.ok) throw new Error('Error actualizando contacto')
    const updated = await res.json()
    setContacts(prev => prev.map(c => c.id === id ? updated : c))
    return updated
  }

  async function deleteContact(id) {
    const res = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Error eliminando contacto')
    setContacts(prev => prev.filter(c => c.id !== id))
  }

  // helpers para el Modal de confirmación
  function askDelete(id, name) {
    setConfirm({ id, name })
  }
  function cancelDelete() {
    setConfirm(null)
  }
  async function confirmDelete() {
    if (confirm?.id) {
      await deleteContact(confirm.id)
      setConfirm(null)
    }
  }

  const value = {
    contacts, loading, error,
    addContact, updateContact, deleteContact,
    fetchContacts,
    // modal confirm
    confirm, askDelete, cancelDelete, confirmDelete
  }

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  )
}
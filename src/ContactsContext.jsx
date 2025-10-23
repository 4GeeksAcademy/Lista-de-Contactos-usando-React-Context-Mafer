import React from 'react'

const ContactsContext = React.createContext()
export const useContacts = () => React.useContext(ContactsContext)

const API_BASE = 'https://Playground.4geeks.com/contact' // en minúsculas
const AGENDA_SLUG = 'my_super_agenda'

export function ContactsProvider({ children }) {
  const [contacts, setContacts] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  // Estado del nuevo modal de eliminación
  const [deleteTarget, setDeleteTarget] = React.useState(null) // { id, name } | null

  React.useEffect(() => { init() }, [])

  async function init() {
    setLoading(true)
    try {
      await ensureAgenda()
      await loadContacts()
    } catch (e) {
      console.error(e)
      setError('No fue posible cargar los contactos.')
    } finally {
      setLoading(false)
    }
  }

  async function ensureAgenda() {
    const r = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`)
    if (r.ok) return
    if (r.status === 404) {
      const c = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}`, { method: 'POST' })
      if (!c.ok) throw new Error('No se pudo crear la agenda.')
      return
    }
    throw new Error('Error verificando la agenda.')
  }

  async function loadContacts() {
    const r = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`)
    if (!r.ok) throw new Error('Error obteniendo contactos')
    const data = await r.json()
    setContacts(data.contacts || [])
  }

  async function createContact(payload) {
    const r = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!r.ok) throw new Error('Error creando contacto')
    const created = await r.json()
    setContacts(prev => [created, ...prev])
    return created
  }

  async function editContact(id, payload) {
    const r = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    if (!r.ok) throw new Error('Error actualizando contacto')
    const updated = await r.json()
    setContacts(prev => prev.map(c => (c.id === id ? updated : c)))
    return updated
  }

  async function removeContact(id) {
    const r = await fetch(`${API_BASE}/agendas/${AGENDA_SLUG}/contacts/${id}`, { method: 'DELETE' })
    if (!r.ok) {
      const txt = await r.text().catch(() => '')
      throw new Error(`No se pudo eliminar (${r.status}) ${txt}`)
    }
    setContacts(prev => prev.filter(c => c.id !== id))
  }

  // API del modal de eliminación
  function askToDelete(contact) {
    setDeleteTarget(contact ? { id: contact.id, name: contact.name } : null)
  }
  function closeDelete() {
    setDeleteTarget(null)
  }
  async function confirmDelete() {
    if (!deleteTarget?.id) return
    await removeContact(deleteTarget.id)
    setDeleteTarget(null)
  }

  const value = {
    contacts, loading, error,
    // Nombres antiguos (compatibilidad con tu AddContact.jsx actual)
    addContact: createContact,
    updateContact: editContact,
    deleteContact: removeContact,
    fetchContacts: loadContacts,
    // Nombres nuevos (si quieres usarlos)
    createContact, editContact, removeContact, loadContacts,
    // Modal eliminación
    deleteTarget, askToDelete, closeDelete, confirmDelete
  }

  return <ContactsContext.Provider value={value}>{children}</ContactsContext.Provider>
}
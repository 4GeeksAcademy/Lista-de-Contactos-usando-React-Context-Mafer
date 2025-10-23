import { useNavigate } from 'react-router-dom'
import { useContacts } from './ContactsContext.jsx'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaRegEdit, FaTrashAlt } from 'react-icons/fa'

const AVATAR_URL = 'https://svgsilh.com/svg_v2/1293388.svg'

export default function ContactCard({ contact }) {
    const navigate = useNavigate()
    const { askToDelete } = useContacts()

    return (
        <div className="row">
            <div className="avatar">
                <img src={AVATAR_URL} alt={contact.name || 'Avatar'} loading="lazy" decoding="async" />
            </div>

            <div style={{ minWidth: 0 }}>
                <div className="row-title">{contact.name}</div>

                <div className="row-meta">
                    <div className="meta-item" title={contact.address || 'No address'}>
                        <FaMapMarkerAlt color="#64748b" />
                        <span>{contact.address || '—'}</span>
                    </div>
                    <div className="meta-item" title={contact.phone || 'No phone'}>
                        <FaPhoneAlt color="#64748b" />
                        <span>{contact.phone || '—'}</span>
                    </div>
                    <div className="meta-item" title={contact.email || 'No email'}>
                        <FaEnvelope color="#64748b" />
                        <span>{contact.email || '—'}</span>
                    </div>
                </div>
            </div>

            <div className="actions">
                <button type="button" className="btn btn-ghost" title="Editar" onClick={() => navigate(`/edit/${contact.id}`)}>
                    <FaRegEdit />
                </button>
                <button
                    type="button"
                    className="btn btn-ghost"
                    title="Eliminar"
                    aria-label="Eliminar contacto"
                    onClick={() => askToDelete(contact)}
                >
                    <FaTrashAlt color="#6b7280" />
                </button>
            </div>
        </div>
    )
}
import { useNavigate } from 'react-router-dom'
import { useContacts } from '../src/ContactsContext.jsx'
import { FaLocationDot } from 'react'
import { FaPhoneAlt, FaEnvelope, FaRegEdit, FaTrashAlt } from 'react'

export default function ContactCard({ contact }) {
    const navigate = useNavigate()
    const { askDelete } = useContacts()

    const avatar = `https://i.pravatar.cc/100?u=${contact.id}`

    return (
        <div className="row">
            <img className="avatar" src={avatar} alt={contact.name} />

            <div style={{ minWidth: 0 }}>
                <div className="row-title">{contact.name}</div>

                <div className="row-meta">
                    <div className="meta-item" title={contact.address || 'No address'}>
                        <FaLocationDot color="#64748b" />
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
                <button className="btn btn-ghost" title="Edit"
                    onClick={() => navigate(`/edit/${contact.id}`)}>
                    <FaRegEdit />
                </button>
                <button className="btn btn-ghost" title="Delete"
                    onClick={() => askDelete(contact.id, contact.name)}>
                    <FaTrashAlt color="#ef4444" />
                </button>
            </div>
        </div>
    )
}
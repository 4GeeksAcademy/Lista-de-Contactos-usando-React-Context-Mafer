import { useNavigate } from 'react-router-dom'
import { useContacts } from './ContactsContext.jsx'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaRegEdit, FaTrashAlt } from 'react-icons/fa'

export default function ContactCard({ contact }) {
    const navigate = useNavigate()
    const { askDelete } = useContacts()

    // Usa la imagen que moviste a /public
    const avatar = '/person-7243410_1280.webp'

    return (
        <div className="row">
            <img className="avatar" src={avatar} alt={contact.name || 'Avatar'} />

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
                {/* Editar */}
                <button
                    type="button"
                    className="btn btn-ghost"
                    title="Editar"
                    onClick={() => navigate(`/edit/${contact.id}`)}
                >
                    <FaRegEdit />
                </button>

                {/* NUEVO botón gris para eliminar (abre el modal de confirmación) */}
                <button
                    type="button"
                    className="btn btn-ghost"
                    title="Eliminar"
                    aria-label="Eliminar contacto"
                    onClick={() => askDelete(contact.id, contact.name)}
                >
                    {/* Icono gris (no rojo) */}
                    <FaTrashAlt color="#6b7280" />
                </button>
            </div>
        </div>
    )
}
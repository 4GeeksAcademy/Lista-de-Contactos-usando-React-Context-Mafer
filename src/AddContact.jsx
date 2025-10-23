import { useNavigate, useParams } from 'react-router-dom'
import { useContacts } from './ContactsContext.jsx'
import React from 'react'

const empty = { name: '', email: '', phone: '', address: '' }

export default function AddContact() {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEdit = Boolean(id)

    const { contacts, addContact, updateContact } = useContacts()
    const current = isEdit ? contacts.find(c => String(c.id) === String(id)) : null

    const [values, setValues] = React.useState(current || empty)
    const [saving, setSaving] = React.useState(false)
    const [err, setErr] = React.useState(null)

    React.useEffect(() => {
        if (isEdit && current) setValues(current)
    }, [isEdit, current])

    function onChange(e) {
        const { name, value } = e.target
        setValues(v => ({ ...v, [name]: value }))
    }

    async function onSubmit(e) {
        e.preventDefault()
        setSaving(true); setErr(null)
        try {
            if (isEdit) {
                await updateContact(current.id, values)
            } else {
                await addContact(values)
            }
            navigate('/')
        } catch (error) {
            setErr(error.message || 'Ocurrió un error')
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="form card">
            <h2>{isEdit ? 'Edit contact' : 'Add a new contact'}</h2>

            <form onSubmit={onSubmit}>
                <div className="field">
                    <label>Full Name</label>
                    <input
                        className="input"
                        name="name"
                        value={values.name}
                        onChange={onChange}
                        placeholder="Full Name"
                        required
                    />
                </div>

                <div className="field">
                    <label>Email</label>
                    <input
                        className="input"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={onChange}
                        placeholder="Enter email"
                    />
                </div>

                <div className="field">
                    <label>Phone</label>
                    <input
                        className="input"
                        name="phone"
                        value={values.phone}
                        onChange={onChange}
                        placeholder="Enter phone"
                    />
                </div>

                <div className="field">
                    <label>Address</label>
                    <input
                        className="input"
                        name="address"
                        value={values.address}
                        onChange={onChange}
                        placeholder="Enter address"
                    />
                </div>

                <button className="btn btn-primary" disabled={saving || !values.name}>
                    {saving ? 'Saving...' : 'save'}
                </button>

                <div>
                    <span className="link" onClick={() => navigate('/')}>
                        or get back to contacts
                    </span>
                </div>

                {err && <p style={{ color: '#ef4444', marginTop: 10 }}>{err}</p>}
            </form>
        </div>
    )
}
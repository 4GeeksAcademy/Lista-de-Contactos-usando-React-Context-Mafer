import React from 'react'
import { createPortal } from 'react-dom'
import { useContacts } from './ContactsContext.jsx'

export default function DeleteContactModal() {
    const { deleteTarget, closeDelete, confirmDelete } = useContacts()
    const [busy, setBusy] = React.useState(false)
    const [err, setErr] = React.useState(null)

    // Cerrar con ESC
    React.useEffect(() => {
        if (!deleteTarget) return
        const onKey = (e) => { if (e.key === 'Escape') closeDelete() }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [deleteTarget, closeDelete])

    if (!deleteTarget) return null

    const node = (
        <div className="cl-modal-backdrop" role="dialog" aria-modal="true" onClick={busy ? undefined : closeDelete}>
            <div className="cl-modal" onClick={(e) => e.stopPropagation()}>
                <h3>Eliminar contacto</h3>
                <p>¿Seguro que deseas eliminar “{deleteTarget.name || 'este contacto'}”?</p>
                {err && <p style={{ color: '#ef4444', marginTop: 8 }}>{err}</p>}
                <div className="modal-actions">
                    <button className="btn" onClick={closeDelete} disabled={busy}>Cancelar</button>
                    <button
                        className="btn btn-danger"
                        onClick={async () => {
                            try {
                                setErr(null)
                                setBusy(true)
                                await confirmDelete()
                            } catch (e) {
                                setErr(e?.message || 'No se pudo eliminar.')
                            } finally {
                                setBusy(false)
                            }
                        }}
                        disabled={busy}
                    >
                        {busy ? 'Eliminando…' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    )
    return createPortal(node, document.body)
}
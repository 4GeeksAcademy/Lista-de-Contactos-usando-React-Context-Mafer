import React from 'react'
import { createPortal } from 'react-dom'
import { useContacts } from './ContactsContext.jsx'

export default function DeleteContactModal() {
    const { deleteTarget, closeDelete, confirmDelete } = useContacts()
    const [busy, setBusy] = React.useState(false)

    // Cerrar con ESC
    React.useEffect(() => {
        if (!deleteTarget) return
        const onKey = e => { if (e.key === 'Escape') closeDelete() }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [deleteTarget, closeDelete])

    if (!deleteTarget) return null

    const node = (
        <div className="modal-backdrop" role="dialog" aria-modal="true" onClick={busy ? undefined : closeDelete}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h3>Eliminar contacto</h3>
                <p>¿Seguro que deseas eliminar “{deleteTarget.name || 'este contacto'}”?</p>
                <div className="modal-actions">
                    <button className="btn" onClick={closeDelete} disabled={busy}>Cancelar</button>
                    <button
                        className="btn btn-danger"
                        onClick={async () => { try { setBusy(true); await confirmDelete() } finally { setBusy(false) } }}
                        disabled={busy}
                    >
                        {busy ? 'Eliminando…' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    )

    // Se monta en <body> para evitar problemas de stacking/z-index
    return createPortal(node, document.body)
}
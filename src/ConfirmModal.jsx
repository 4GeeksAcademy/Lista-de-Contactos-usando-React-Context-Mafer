import React from 'react'
import { useContacts } from './ContactsContext.jsx'

export default function ConfirmModal() {
    const { confirm, cancelDelete, confirmDelete } = useContacts()
    const [working, setWorking] = React.useState(false)

    if (!confirm) return null

    async function onConfirm() {
        try {
            setWorking(true)
            await confirmDelete()
        } catch (e) {
            alert('No se pudo eliminar el contacto: ' + (e?.message || 'Error desconocido'))
        } finally {
            setWorking(false)
        }
    }

    return (
        <div className="modal-backdrop" onClick={working ? undefined : cancelDelete}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h3>Eliminar contacto</h3>
                <p>¿Seguro que deseas eliminar “{confirm.name ?? 'este contacto'}”? Esta acción no se puede deshacer.</p>
                <div className="modal-actions">
                    <button className="btn" onClick={cancelDelete} disabled={working}>Cancelar</button>
                    {/* Este botón es el que realmente elimina en la API */}
                    <button className="btn btn-danger" onClick={onConfirm} disabled={working}>
                        {working ? 'Eliminando…' : 'Eliminar'}
                    </button>
                </div>
            </div>
        </div>
    )
}
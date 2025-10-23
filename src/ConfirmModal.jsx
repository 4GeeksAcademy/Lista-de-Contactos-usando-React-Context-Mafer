import { useContacts } from '../src/ContactsContext.jsx'

export default function ConfirmModal() {
    const { confirm, cancelDelete, confirmDelete } = useContacts()
    if (!confirm) return null

    return (
        <div className="modal-backdrop" onClick={cancelDelete}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <h3>Eliminar contacto</h3>
                <p>¿Seguro que deseas eliminar “{confirm.name ?? 'este contacto'}”? Esta acción no se puede deshacer.</p>
                <div className="modal-actions">
                    <button className="btn" onClick={cancelDelete}>Cancelar</button>
                    <button className="btn btn-danger" onClick={confirmDelete}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}
import React from 'react'
import Button from '../Button'
import './Modal.css'

export interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmText?: string
  cancelText?: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = React.memo(
  ({
    isOpen,
    title,
    message,
    confirmText = 'Удалить',
    cancelText = 'Отмена',
    onConfirm,
    onCancel,
  }) => {
    if (!isOpen) return null

    return (
      <div className="modal-overlay" onClick={onCancel}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <h3 className="modal__title">{title}</h3>
          <p className="modal__message">{message}</p>
          <div className="modal__actions">
            <Button variant="secondary" onClick={onCancel}>
              {cancelText}
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

ConfirmModal.displayName = 'ConfirmModal'

export default ConfirmModal

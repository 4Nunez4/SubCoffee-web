import React from 'react'
import ModalForms from './ModalForms'

function ModalUser({ open, onClose, handleSubmit, actionLabel, initialData, mode }) {
  return (
    <>
        <ModalForms open={open} onClose={onClose} >
            <FormResultados handleSubmit={handleSubmit} initialData={initialData} mode={mode} actionLabel={actionLabel}/>
        </ModalForms>
    </>
  )
}

export default ModalUser
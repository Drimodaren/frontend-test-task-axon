import React from 'react'
import './FormField.css'

export interface FormFieldProps {
  children: React.ReactNode
  label?: string
  required?: boolean
  error?: string
  className?: string
}

const FormField: React.FC<FormFieldProps> = React.memo(
  ({ children, label, required, error, className = '' }) => {
    return (
      <div className={`form-field ${className}`.trim()}>
        {label && (
          <label className="form-field__label">
            {label}
            {required && <span className="form-field__required">*</span>}
          </label>
        )}
        <div className="form-field__input">{children}</div>
        {error && <span className="form-field__error">{error}</span>}
      </div>
    )
  }
)

FormField.displayName = 'FormField'

export default FormField

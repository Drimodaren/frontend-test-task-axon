import React, { forwardRef } from 'react'
import './Input.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'input' | 'textarea'
  rows?: number
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export const Input = React.memo(
  forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
    ({ variant = 'input', className = '', ...props }, ref) => {
      const baseClass = 'form-input'

      if (variant === 'textarea') {
        return (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            className={`${baseClass} ${className}`.trim()}
            rows={props.rows || 4}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        )
      }

      return (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={`${baseClass} ${className}`.trim()}
          {...props}
        />
      )
    }
  )
)

Input.displayName = 'Input'

export const Select: React.FC<SelectProps> = React.memo(
  ({ children, className = '', ...props }) => {
    return (
      <select className={`form-select ${className}`.trim()} {...props}>
        {children}
      </select>
    )
  }
)

Select.displayName = 'Select'

export const Checkbox: React.FC<CheckboxProps> = React.memo(
  ({ label, className = '', ...props }) => {
    return (
      <div className="form-checkbox-group">
        <label className={`form-checkbox-label ${className}`.trim()}>
          <input type="checkbox" className="form-checkbox" {...props} />
          <span className="form-checkbox-text">{label}</span>
        </label>
      </div>
    )
  }
)

Checkbox.displayName = 'Checkbox'

export default Input

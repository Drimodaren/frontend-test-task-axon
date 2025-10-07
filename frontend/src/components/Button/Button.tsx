import React from 'react'
import './Button.css'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'icon'
  iconVariant?: 'info' | 'edit' | 'delete'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = React.memo(
  ({ variant = 'primary', iconVariant, className = '', children, ...props }) => {
    const getButtonClass = () => {
      const baseClass = 'btn'
      const variantClass = `btn-${variant}`
      const iconClass = iconVariant ? `btn-icon-${iconVariant}` : ''

      return `${baseClass} ${variantClass} ${iconClass} ${className}`.trim()
    }

    return (
      <button className={getButtonClass()} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button

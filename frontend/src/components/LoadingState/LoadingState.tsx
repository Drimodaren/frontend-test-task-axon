import React from 'react'
import './LoadingState.css'

export interface LoadingProps {
  message?: string
}

export interface ErrorProps {
  message: string
  className?: string
}

export const Loading: React.FC<LoadingProps> = React.memo(({ message = 'Загрузка...' }) => {
  return (
    <div className="loading-state">
      <div className="loading-spinner"></div>
      <span className="loading-message">{message}</span>
    </div>
  )
})

Loading.displayName = 'Loading'

export const ErrorMessage: React.FC<ErrorProps> = React.memo(({ message, className = '' }) => {
  return (
    <div className={`error-state ${className}`.trim()}>
      <span className="error-message">Ошибка: {message}</span>
    </div>
  )
})

ErrorMessage.displayName = 'ErrorMessage'

export default Loading

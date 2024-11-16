import type { ButtonHTMLAttributes } from 'react'
import type React from 'react'
import './button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  ...rest
}) => {
  let buttonClassName = 'button'

  switch (variant) {
    case 'primary':
      buttonClassName += ' button-primary'
      break
    case 'secondary':
      buttonClassName += ' button-secondary'
      break
    case 'danger':
      buttonClassName += ' button-danger'
      break
  }

  return (
    <button className={buttonClassName} {...rest}>
      {children}
    </button>
  )
}

export default Button

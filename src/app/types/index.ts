import type React from 'react'
import type { ButtonHTMLAttributes } from 'react'

export interface ErrorContextProps {
  handleError: (error: unknown, action?: string) => void
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  children: React.ReactNode
}

export interface TextFieldProps {
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

'use client'

import type { ReactNode } from 'react'
import { createContext, useContext } from 'react'
import { toast } from 'react-toastify'
import type { ErrorContextProps } from '../types'


const ErrorContext = createContext<ErrorContextProps | undefined>(undefined)

export const ErrorProvider = ({ children }: { children: ReactNode }) => {

  const handleError: ErrorContextProps['handleError'] = (error, action) => {
    if (error) {
      const errorMessage = `${action ?? ''}中にエラーが発生しました。`
      const details =
        error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : '不明なエラー'

      toast.error(`${errorMessage} 詳細: ${details}`)
      console.error(error)
    }
  }

  return (
    <ErrorContext.Provider value={{ handleError }}>
      {children}
    </ErrorContext.Provider>
  )
}

export const useErrorContext = () => {
  const context = useContext(ErrorContext)
  if (!context) {
    throw new Error(
      'useErrorContext は ErrorProvider の内部で使用しなければなりません。',
    )
  }
  return context
}

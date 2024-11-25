import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { ErrorProvider } from './context/ErrorContext'
import Header from './components/layout/Header'
import { ToastContainer } from 'react-toastify'
import './styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'


export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <ErrorProvider>
          <Header />
          {children}
          <ToastContainer />
        </ErrorProvider>
      </body>
    </html>
  )
}

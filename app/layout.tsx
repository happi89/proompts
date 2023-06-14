import Nav from '@/components/Nav'
import '@/styles/globals.css'
import React from 'react'

import { Toaster } from "@/components/ui/toaster"

export const metatdata = {
  title: 'Proompts',
  description: 'Explore and share the best AI PROOMPTS',
}

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          {/* @ts-expect-error */}
          <Nav />
          {children}
          <Toaster />
        </main>
      </body>
    </html>
  )
}

export default RootLayout

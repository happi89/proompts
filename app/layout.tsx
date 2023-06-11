import NavBlock from '@/components/Nav'
import Provider from '@/components/Provider'
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
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <NavBlock />
            {children}
            <Toaster />
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout

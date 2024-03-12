'use client';

import { SessionProvider } from 'next-auth/react';

const Provider = ({ children, session }) => {
  console.log("sessionProvider: ", session)
  return (
    <div>
      <SessionProvider session={session}>
        {children}
      </SessionProvider>
    </div>
  )
}

export default Provider

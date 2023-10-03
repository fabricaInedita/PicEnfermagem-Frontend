import React from 'react'

function Theme({children}) {
  return (
    <div className='bg-gradient-to-tl from-purple-600 via-purple-500 to-indigo-500 w-full h-full'>
      {children}
    </div>
  )
}

export default Theme
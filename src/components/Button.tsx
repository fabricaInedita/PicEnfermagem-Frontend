import React from 'react'

function Button({submit,children}:any) {
  return (
    <button
        onClick={submit}
        type="submit"
        className="text white p-3 bg-orange-400 border-white border-2 text-white rounded-lg "
    >
    {children}
  </button>
  )
}

export default Button
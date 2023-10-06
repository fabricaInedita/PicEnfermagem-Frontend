import React from 'react'

function Button({submit,children,disable}:any) {
  return (
    <button
        disabled={disable}
        onClick={submit}
        type="submit"
        className="text flex justify-center items-center white p-3 bg-orange-400 border-white border-2 text-white rounded-lg "
    >
    {children}
  </button>
  )
}

export default Button
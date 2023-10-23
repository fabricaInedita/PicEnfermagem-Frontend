import React from 'react'
import Loading from './Loading'

function Button({submit,children,disable,className,loading}:any) {
  return (
    <button
        disabled={disable}
        onClick={submit}
        type="submit"
        className={className}
    >
      {
        loading?
          <Loading visible={true} className={"w-6 h-6"} />
          :
          children
      }
  </button>
  )
}

export default Button
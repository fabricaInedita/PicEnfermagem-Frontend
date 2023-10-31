import React from 'react'

function Limiter(props:any) {
  return (
    <div className="max-w-7xl w-full h-full  px-5 ">
        {props.children}
    </div>  
  )
}

export default Limiter
import React from 'react'
import InputMask from 'react-input-mask'

function Input({register,error,defaultValue,label,type,mask}:any) {
  return (
    <React.Fragment>
        <div className={'relative text-zinc-200'}>
            <label className=' mb-3 font-semibold px-1'>{label}</label>
            {type=="date"&&
              <InputMask defaultValue={defaultValue} {...register} mask="99-99-9999" maskChar="_" className='h-12 indent-3 bg-transparent w-full border-white rounded-lg border'
            />}
            {type==null&&
              <input
                {...register}
                defaultValue={defaultValue}
                type='text'
                autoComplete='off'
                className='h-12 indent-3 bg-transparent w-full border-white rounded-lg border'
            />}
            {type=="password"&&
              <input
                {...register}
                defaultValue={defaultValue}
                type='password'
                autoComplete="off"
                className='h-12 indent-3 bg-transparent w-full border-white rounded-lg border'
            />}
            {type=="textarea"&&
              <textarea {...register} className=' p-3 h-56 bg-transparent w-full border-white rounded-lg border'
            />}
            {/* //deprecread */}
            {type=="mask"&&
              <InputMask  {...register} mask={mask} maskChar="_" className='h-12 indent-3 bg-transparent w-full border-white rounded-lg border'
            />}
          {error && <span className='text-red-400'>{error.message}</span>}
        </div>
    </React.Fragment>
  )
}   

export default Input
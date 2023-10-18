import React from 'react'
import Theme from '../components/Theme'
import Limiter from '../components/Limiter'
import Input from '../components/Input'
import Button from '../components/Button'

function Certificate() {
  return (
    <Theme>
        <div className='flex justify-center items-center'>
            <Limiter>
                <div className='min-h-screen items-center justify-center flex'>
                      <div className='flex flex-col gap-3 bg-gray-800 text-white h-fit w-fit p-5 rounded-md border-white-2 border'>
                        <h1 className='font-semibold'>Parabens! Você finalizou o quiz de enfermagem!</h1>
                        <h2 >Agora você pode reenvidicar sua medalha!</h2>
                        <p>Escreva seu e-mail a baixo para receber sua medalha:</p>
                        <Input
                          label="E-mail"
                        />
                        <Button>Enviar e ver ranking</Button>
                      </div>
                </div>
            </Limiter>
        </div>
    </Theme>                    
  )
}

export default Certificate
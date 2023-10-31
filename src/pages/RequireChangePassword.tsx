import React, { Fragment, useState } from 'react'
import Theme from '../components/Theme'
import Limiter from '../components/Limiter'
import Button from '../components/Button'
import Input from '../components/Input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import logo from '../assets/logo_barao_branco_horizontal_nova.png'
import verify from '../assets/verify.svg'
import {LoginService} from '../services/LoginService'

function RequireChangePassword() {

    const [loadingButton, setLoadingButton] = useState(false)

    const [finishForm, setFinishForm] = useState(false)
    
    const formSchema = z.object({
        email: z.string().nonempty("Campo Obrigatório").email("Formato inválido")
    })

    const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
        }
    );

    const loginService = new LoginService()

    function handleSendEmail(data) {
        setLoadingButton(true)
        loginService.requireChangePassword(data.email)
            .then(response=>{
                setLoadingButton(false)
                setFinishForm(true)
            })
            .catch(error=>{
                setLoadingButton(false)
            })
    }

    return (
        <div className='flex justify-center items-center'>
            <Limiter>
                <div className='min-h-screen justify-center flex'>
                    <div className='text-white flex-1 items-center justify-center flex flex-col gap-6 my-6 transition-all '>
                        <img className='w-60' src={logo} alt="" />
                        <div className="w-full rounded-lg max-w-xs   bg-gray-800 border-gray-700">
                            <div className="p-6 space-y-4 ">
                                {
                                    !finishForm?
                                        <form onSubmit={handleSubmit(handleSendEmail)} className='flex flex-col gap-3' action="#">
                                            <p className='font-semibold'>Alterar Senha</p>
                                            <Input
                                                register={register('email')}
                                                label="E-Mail"
                                                error={errors.email}
                                            />
                                            <Button 
                                                type="submit" 
                                                loading={loadingButton}
                                                className="text w-full text-white flex justify-center items-center white p-3 bg-purple-700 rounded-lg">
                                                Solicitar 
                                            </Button>
                                            <p className="text-sm font-light text-purple-300">
                                                <Link to="/login" className="font-medium text-primary-600 hover:underline">Voltar para tela de login</Link>
                                            </p>
                                        </form>
                                        :
                                        <div className='flex flex-col gap-3 justify-center items-center'>
                                            <img className='w-12 h-12' src={verify} alt="" />
                                            <p>Foi enviado um uma mensagem para seu e-mail, siga as instruções para alterar a senha. </p>
                                            <Link to={'/login'}>    
                                                <Button 
                                                    type="submit" 
                                                    className="text w-full text-white flex justify-center items-center white p-3 bg-purple-700 rounded-lg">
                                                        Voltar para tela de login 
                                                </Button>
                                            </Link>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Limiter>
        </div>
    )
}

export default RequireChangePassword
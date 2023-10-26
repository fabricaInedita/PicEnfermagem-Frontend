import React, { Fragment, useState } from 'react'
import Theme from '../components/Theme'
import Limiter from '../components/Limiter'
import Button from '../components/Button'
import Input from '../components/Input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import logo from '../assets/logo_barao_branco_horizontal_nova.png'
import { Link } from 'react-router-dom'
import verify from '../assets/verify.svg'
import { LoginService } from '../services/LoginService'

function ChangePassword() {

    const queryParameters = new URLSearchParams(window.location.search)

    const token:any = queryParameters.get("token")

    const [loadingButton, setLoadingButton] = useState(false)

    const [finishForm, setFinishForm] = useState(false)

    const formSchema = z.object({
        password: z.string().nonempty("Campo Obrigatório"),
        confirmPassword: z.string().nonempty("Campo Obrigatório")
    })

    const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
        }
    );

    const loginService = new LoginService()

    function handleSendEmail({password,confirmPassword}) {
        setLoadingButton(true)
        loginService.changePassword({
            password:password,
            confirmPassword:confirmPassword,
            token:token
        })
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
                <div className='text-white flex-1 items-center justify-center flex flex-col gap-6 my-6 transition-all'>
                        <img className='w-60' src={logo} alt="" />
                        <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                {   
                                    token?
                                        !finishForm?
                                            <form onSubmit={handleSubmit(handleSendEmail)} className='flex flex-col gap-3' action="#">
                                                <p className='font-semibold'>Alterar Senha</p>
                                                <Input
                                                    register={register('password')}
                                                    label="Senha"
                                                    error={errors.password}
                                                />
                                                <Input
                                                    register={register('confirmPassword')}
                                                    label="Confirmar Senha"
                                                    error={errors.confirmPassword}
                                                />
                                                    <Button 
                                                        type="submit"
                                                        loading={loadingButton} 
                                                        className="text w-full text-white flex justify-center items-center white p-3 bg-purple-700  rounded-lg ">
                                                        Confirmar nova senha
                                                    </Button>
                                            </form>    
                                            :                                  
                                            <div className='flex flex-col gap-3 justify-center items-center'>
                                                <img className='w-12 h-12' src={verify} alt="" />
                                                <p>Senha alterada com sucesso</p>
                                                <Link to={'/login'}>    
                                                    <Button 
                                                        type="submit" 
                                                        className="text w-full text-white flex justify-center items-center white p-3 bg-purple-700  rounded-lg ">
                                                            Voltar para tela de login 
                                                    </Button>
                                                </Link>
                                            </div>
                                        :   
                                        <div className='flex text-white justify-center items-center gap-6 flex-col'>
                                            <div className='w-44 flex flex-col items-center justify-center gap-3'>
                                                <p className='text-2xl'>
                                                    Opss...
                                                </p>
                                                <p className='text-lg'>
                                                    Parece que seu link expirou
                                                </p>
                                            </div>
                                            <Link to={'/login'}>
                                                <Button 
                                                    type="submit" 
                                                    className="text w-full text-white flex justify-center items-center white p-3 bg-purple-700  rounded-lg ">
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

export default ChangePassword
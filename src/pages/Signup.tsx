import React, { useState } from 'react'
import Theme from '../components/Theme'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '../components/Loading'
import { SignupService } from '../services/SignupService';
import Limiter from '../components/Limiter'
import logo from '../assets/logo_barao_branco_horizontal_nova.png'
import Button from '../components/Button'

function Signup() {
    const [loginLoading, setLoginLoding] = useState(false)

    const [signUpSuccefull, setSignUpSuccefull] = useState(false)

    const signupService = new SignupService() 

    const formSchema = z.object({
        studentCode: z.string().nonempty("Campo Obrigatório").refine(value => {
            if (/^[0-9]+$/.test(value)) {
                return true;
            }
            else {
                return false;
            }
        },
            "Numero inválido"
        ),
        email: z.string().nonempty("Campo Obrigatório").email("Formato invalido de e-mail"),
        password: z.string().nonempty("Campo Obrigatório"),
        passwordConfirm: z.string().nonempty("Campo Obrigatório")
    })

    const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
        }
    );

    function handleSingup(data) {
        setLoginLoding(true)
        signupService.signupPost(data)
            .then(() => {
                setLoginLoding(false)
                setSignUpSuccefull(true)
            })
            .catch(() => {
                setLoginLoding(false)
            })
    }

    return (
        <div className='flex justify-center items-center'>
            <Limiter>
            <div className='min-h-screen items-center justify-center flex'>
                <div className='flex-1 items-center flex flex-col gap-6 my-6 transition-all '>
                    <img className='w-60' src={logo} alt="" />
                    <div className="w-full rounded-lg shadow max-w-xs  bg-gray-800 border-gray-700">
                        <div className="p-6 space-y-4 ">
                            <h2 className="text-xl font-semibold leading-tight tracking-tight text-white">
                                Cadastre-se
                            </h2>
                            {!signUpSuccefull ?
                                <form onSubmit={handleSubmit(handleSingup)} className="flex flex-col gap-3" action="#">
                                    <Input
                                        register={register('studentCode')}
                                        label="Codigo do aluno"
                                        error={errors.studentCode}
                                    />
                                    <Input
                                        register={register('email')}
                                        label="E-Mail"
                                        error={errors.email}
                                    />
                                    <Input
                                        register={register('password')}
                                        label="Senha"
                                        type="password"
                                        error={errors.password}
                                    />
                                    <Input
                                        register={register('passwordConfirm')}
                                        label="Confirmar Senha"
                                        type="password"
                                        error={errors.password}
                                    />
                                    <Button 
                                        loading={loginLoading}
                                        type="submit" 
                                        className="text w-full text-white flex justify-center items-center white p-3 bg-purple-700  rounded-lg ">
                                        Registrar
                                    </Button>    
                                </form> 
                                :
                                <div className='text-white'>
                                    <p>Conta criada com sucesso. Verifique sua caixa de e-mail para ativar sua conta.</p>
                                </div>
                            }
                            <p className="text-sm font-light text-purple-300">
                                <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Ja possui uma conta? Entre aqui
                                </Link>
                            </p>    
                        </div>
                    </div>
                </div>
            </div>
            </Limiter>
        </div>
    )
}

export default Signup
import React, { useContext, useState } from 'react'
import Theme from '../components/Theme'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'
import Loading from '../components/Loading'
import { zodResolver } from "@hookform/resolvers/zod"
import Input from '../components/Input'
import Limiter from '../components/Limiter'
import barao from '../assets/logo_barao_branco_horizontal_nova.png'
import Button from '../components/Button'
import logo from '../assets/logo.svg'

function Login() {
    const [loginLoading, setLoginLoading] = useState(false)

    const navigate = useNavigate()

    const formSchema = z.object({
        studentCode: z.string().nonempty("Campo Obrigatório"),
        password: z.string().nonempty("Campo Obrigatório")
    })

    const { handleSubmit, formState: { errors }, register } = useForm<z.infer<typeof formSchema>>(
        {
            resolver: zodResolver(formSchema),
        }
    );

    const { signIn } = useContext(AuthContext)

    async function handleSignIn(data: any) {
        setLoginLoading(true)
        await signIn(data)
            .then(() => {
                setLoginLoading(false)
            })
            .catch(() => {
                setLoginLoading(false)
            })
    }

    return (
        <Theme>
            <div className='flex justify-center items-center'>
                <Limiter>
                    <div className='min-h-screen items-center justify-center flex'>
                        <div className='flex-1 items-center flex flex-col gap-6 my-6 transition-all '>
                            <img className='w-60' src={barao} alt="" />
                            <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h2 className="text-x2 font-semibold leading-tight tracking-tight text-white">
                                        Seja Bem vindo de volta
                                    </h2>
                                    <form onSubmit={handleSubmit(handleSignIn)} className='flex flex-col gap-3' action="#">
                                        <Input
                                            register={register('studentCode')}
                                            label="Codigo do aluno"
                                            error={errors.studentCode}
                                        />
                                        <Input
                                            register={register('password')}
                                            label="Senha"
                                            type="password"
                                            error={errors.password}
                                        />
                                        <Button 
                                            type="submit" 
                                            loading={loginLoading}
                                            className="text w-full text-white flex justify-center items-center white p-3 bg-purple-700 rounded-lg">
                                            Entrar
                                        </Button>
                                        <p className="text-sm font-light text-purple-300">
                                            <Link to="/signup" className="font-medium text-primary-600 hover:underline">Sem acesso? Cadastre-se</Link>
                                        </p>
                                        <p className="text-sm font-light text-purple-300">
                                            <Link to="/require-change-password" className="font-medium text-primary-600 hover:underline">Esqueceu a senha? </Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Limiter>
            </div>
        </Theme>
    )
}

export default Login

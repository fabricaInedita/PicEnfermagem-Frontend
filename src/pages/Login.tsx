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
import logo from '../assets/logo_barao_branco_horizontal_nova.png'
import Button from '../components/Button'

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
                            <img className='w-60' src={logo} alt="" />
                            <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h2 className="text-xl font-bold leading-tight tracking-tight text-white">
                                        Quiz de Enfermagem
                                    </h2>
                                    <h2 className="text-xl font-semibold leading-tight tracking-tight text-white">
                                        Entrar
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
                                        <div className="h-20 flex justify-center items-center">
                                            <Button 
                                                type="submit" 
                                                loading={loginLoading}
                                                className="text w-full text-white flex justify-center items-center white p-3 bg-purple-700 rounded-lg">
                                                Entrar
                                            </Button>
                                        </div>
                                        <p className="text-sm font-light text-gray-500">
                                            <Link to="/signup" className="font-medium text-primary-600 hover:underline">Cadastre-se</Link>
                                        </p>
                                        <p className="text-sm font-light text-gray-500">
                                            <Link to="/require-change-password" className="font-medium text-primary-600 hover:underline">Recuperar Senha</Link>
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

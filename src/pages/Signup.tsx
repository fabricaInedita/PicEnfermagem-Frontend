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
        <Theme>
        <div className='flex justify-center items-center'>
          <Limiter>
          <div className='min-h-screen items-center justify-center flex'>
                        <div className='flex-1 items-center flex flex-col gap-3  transition-all'>
                            <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-white">
                                Enfermagem
                            </a>
                            <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-white">
                                Cadastre-se
                            </h1>
                            {!signUpSuccefull ?
                                <form onSubmit={handleSubmit(handleSingup)} className="" action="#">
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
                                    <Input
                                        register={register('passwordConfirm')}
                                        label="Confirmar Senha"
                                        type="password"
                                        error={errors.password}
                                    />
                                    <div className="h-20 flex justify-center items-center">
                                        {loginLoading ?
                                            <Loading visible={true} className={"w-10 h-10"}></Loading> :
                                            <button type="submit" className="w-full bg-purple-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrar</button>
                                        }
                                    </div>
                                </form> :
                                <div className='text-white'>
                                    <p>Conta criada com sucesso</p>
                                </div>
                            }
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Entrar</Link>
                            </p>
                        </div>
                    </div>
                  </div>
            </div>
          </Limiter>
        </div>
    </Theme>
    )
}

export default Signup
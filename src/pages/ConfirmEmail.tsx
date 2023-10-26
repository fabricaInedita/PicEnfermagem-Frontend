import React, { useEffect, useState } from 'react'
import Theme from '../components/Theme'
import Limiter from '../components/Limiter'
import logo from '../assets/logo_barao_branco_horizontal_nova.png'
import verify from '../assets/verify.svg'
import error from '../assets/fail.svg'
import Input from '../components/Input'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import { LoginService } from '../services/LoginService'

function ConfirmEmail() {

    const loginService = new LoginService()

    const queryParameters = new URLSearchParams(window.location.search)

    const token:any = queryParameters.get("token")

    const userId:any = queryParameters.get("userid")

    const [loadingValidation, setLoadingValidation] = useState(true)

    const [validatationIsWork,setValidationIsWord]:any = useState(null)

    useEffect(() => {
        loginService.verifyEmail({token:token,userId:userId})
            .then(response=>{
                console.log(response)
                setLoadingValidation(false)
                setValidationIsWord(true)
            })
            .catch(error=>{
                setLoadingValidation(false)  
                setValidationIsWord(false)
            })
    }, [])

    return (
        <Theme>
            <div className='flex justify-center items-center'>
                <Limiter>
                    <div className='min-h-screen items-center justify-center flex'>
                        <div className='flex-1 items-center flex flex-col gap-6  transition-all '>
                            <img className='w-60' src={logo} alt="" />
                            {loadingValidation ?
                                <div className='flex justify-center items-center h-full'>
                                    <Loading visible={true} className={"w-14 h-14"}></Loading>
                                </div>
                                :
                                validatationIsWork?
                                    <div className=" rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                                        <div className="p-6 items-center flex-col flex gap-4 text-white space-y-4 md:space-y-6 sm:p-8">
                                            <img className='w-12 h-12' src={verify} alt="" />
                                            <p>E-Mail confirmado com sucesso</p>
                                            <Link to={'/login'}>
                                                <Button
                                                    className="text w-full text-white flex justify-center items-center white p-3 bg-purple-700 rounded-lg">
                                                    Ir para tela de login
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                    :
                                    <div className=" rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
                                        <div className="p-6 items-center flex-col flex gap-4 text-white space-y-4 md:space-y-6 sm:p-8">
                                            <img className='w-12 h-12' src={error} alt="" />
                                            <p>Houve algum erro ao validar sua conta</p>
                                            <Link to={'/login'}>
                                                <Button
                                                    className="text w-full text-white flex justify-center items-center white p-3 bg-purple-700 rounded-lg">
                                                    Ir para tela de login
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>
                </Limiter>
            </div>
        </Theme>
    )
}

export default ConfirmEmail
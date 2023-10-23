import React, { useEffect, useState } from 'react'
import Theme from '../components/Theme'
import Limiter from '../components/Limiter'
import Button from '../components/Button'
import { QuestionaryModel } from '../entities/QuestionaryModel'
import Loading from '../components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import { CertificateService } from '../services/CertificateService'
import {QuestionaryService } from '../services/QuestionaryService'
 
function Certificate() {
  
  const [questions, setQuestions] = useState<QuestionaryModel>(new QuestionaryModel())

  const [loadingQuestionary, setLoadingQuestionary] = useState(true)

  const [loadingSendCertificate, setLoadingSendCertificate] = useState(false)

  const navigate = useNavigate()

  const questionaryService = new QuestionaryService()

  const certificateService = new CertificateService()

  function handleSendCertificate() {
    setLoadingSendCertificate(true)
    certificateService.sendCertificate()
        .then(() => {
            setLoadingSendCertificate(false)
            navigate("/ranking")
        })
        .catch(() => {
          setLoadingSendCertificate(false)
        })
  }

  useEffect(() => {            
    setLoadingQuestionary(true)
    questionaryService.getQuestions()
        .then(({data}:{data:QuestionaryModel}) => {
            setQuestions(data)
            setLoadingQuestionary(false)
        })
        .catch(() => {
        })
  }, [])

  return (
    <Theme>
        <div className='flex justify-center items-center'>
            <Limiter>
              <div className='min-h-screen justify-center flex'>
                  <div className='flex-1 flex flex-col gap-3 transition-all'>
                    {loadingQuestionary?
                      <div className='flex justify-center items-center h-full'>
                          <Loading visible={true} className={"w-14 h-14"}></Loading>
                      </div>:
                      questions.questionResponses.length == 0 ?
                        <div className='min-h-screen items-center justify-center flex'>
                              <div className='flex flex-col gap-3 bg-gray-800 text-white h-fit w-fit p-5 rounded-md border-white-2 border'>
                                <h1 className='font-semibold'>Parabens! Você finalizou o quiz de enfermagem!</h1>
                                <h2 >Agora você pode reenvidicar sua medalha!</h2>
                                <p>Escreva seu e-mail a baixo para receber sua medalha:</p>
                                <Button
                                  submit={handleSendCertificate}
                                  disable={loadingSendCertificate}
                                  loading={loadingSendCertificate} 
                                  className="text flex justify-center items-center white p-3 bg-orange-400 border-white border-2 text-white rounded-lg ">
                                  Enviar e ver ranking
                                </Button>
                              </div>
                        </div>
                        :
                        <div className='flex-1 flex text-white justify-center items-center gap-6 flex-col'>
                            <div className='w-44 flex flex-col items-center justify-center gap-3'>
                                <p className='text-2xl'>
                                    Opss...
                                </p>
                                <p className='text-lg'>
                                    Parece que você ainda tem perguntas disponiveis
                                </p>
                            </div>
                            <Link to={'/questionary'}>
                                  <Button 
                                    className="text flex justify-center items-center white p-3 bg-orange-400 border-white border-2 text-white rounded-lg ">
                                      Voltar para o questionario
                                  </Button>
                            </Link>
                        </div>
                    }
                  </div>
            </div>
            </Limiter>
        </div>
    </Theme>                    
  )
}

export default Certificate
import React, { useEffect, useState } from 'react'
import Theme from '../components/Theme'
import Limiter from '../components/Limiter'
import Input from '../components/Input'
import Button from '../components/Button'
import { QuestionaryService } from '../services/QuestionaryService'
import { QuestionaryModel } from '../entities/QuestionaryModel'
import Loading from '../components/Loading'
import { useNavigate } from 'react-router-dom'

function Certificate() {
  
  const [questions, setQuestions] = useState<QuestionaryModel>(new QuestionaryModel())

  const navigate = useNavigate();
  
  const [loadingQuestionary, setLoadingQuestionary] = useState(true)

  const questionaryService = new QuestionaryService()

  useEffect(() => {
    questionaryService.getQuestions()
        .then(({data}:{data:QuestionaryModel}) => {
            setQuestions(data)
            setLoadingQuestionary(true)
            data.questionResponses.length==0?
              setLoadingQuestionary(true)
              :
              navigate("/questionary")
        })
        .catch(() => {
        })
  }, [])


  return (
    <Theme>
        <div className='flex justify-center items-center'>
            <Limiter>
              <div className='min-h-screen justify-center flex'>
                  <div className='flex-1 flex flex-col gap-3 py-20 transition-all'>
                    {loadingQuestionary?
                      <div className='flex justify-center items-center h-full'>
                          <Loading visible={true} className={"w-14 h-14"}></Loading>
                      </div>:
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
                    }
                  </div>
            </div>
            </Limiter>
        </div>
    </Theme>                    
  )
}

export default Certificate
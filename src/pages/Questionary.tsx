import React, { useState } from 'react'
import Limiter from '../components/Limiter'
import Button from '../components/Button'
import Theme from '../components/Theme'
import {questionsTest} from '../test/QuestionsTest'

function Questionary() {

  const [questions, setQuestions] = useState(questionsTest)

  const [points, setPoints] = useState(0)

  const [formTransition, setFormTransition] = useState({
    render:true,
    opacity:false
  })

  function handleSelectQuestion(index:number) {
    if (!questions[0].verify) {
        const updateQuestions = [...questions]
        updateQuestions[0].replys.forEach(item => {
            item.selected = false 
        })
        updateQuestions[0].replys[index].selected = true
        setQuestions(updateQuestions)
    } 
  }

  function handleVerifyQuestion() {
    for (let index = 0; index < questions[0].replys.length; index++) {
        if (questions[0].replys[index].selected) {
            const updateQuestions = [...questions]

            updateQuestions[0].verify = true 

            setQuestions(updateQuestions)   
        }
    }
  }

  function handleNextForm() {

    const updateQuestions = [...questions]

    updateQuestions.shift()

    setFormTransition({...formTransition, opacity:true})

    setTimeout(() => {
        setQuestions(updateQuestions)
        setFormTransition({...formTransition, opacity:false})
    }, 300);
  }
  

  return (
    <Theme>
        <div className='min-h-screen justify-center flex'>
            <Limiter>
                 <div className='flex-1 flex flex-col gap-3 py-20 transition-all'>
                    <div className='flex flex-1 gap-3'>
                        <p className='text-white font-semibold p-3 flex-1 border-white border-2 rounded-lg'>
                            {questions.length > 1 ?
                                `Faltam ${questions.length} perguntas`
                                :
                                `Falta ${questions.length} pergunta`
                            }
                        </p>
                        <p className='text-white font-semibold p-3 border-white border-2 rounded-lg bg-orange-400'>
                            PT: 00000
                        </p>
                    </div>
                    <div className={'gap-3 flex flex-col transition-all' + (formTransition.opacity?" opacity-0" : " opacity-100") }>
                        <div className='bg-purple-600  border-white border-2 rounded-lg p-5'>
                            <p className='text-white text-md'>
                                {questions[0].question}
                            </p>
                        </div>
                        <div className='gap-3 flex flex-col'>
                            {
                                questions[0].replys.map((item,index)=> 
                                    <button
                                        key={index}
                                        onClick={()=>handleSelectQuestion(index)} 
                                        className={
                                        'border-2 transition-all border-white  p-3 text-white font-semibold rounded-lg'
                                        + 
                                        (
                                            questions[0].verify 
                                            ? 
                                                (item.valid&&item.selected
                                                ? " bg-emerald-400":
                                                    item.valid&&" bg-emerald-400"||
                                                    item.selected&& " bg-red-400"
                                                )
                                            :
                                                (item.selected == false
                                                ?   
                                                " bg-purple-500":
                                                " bg-orange-400")
                                        )
                                        }>
                                        A) Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellat fuga vitae nesciunt
                                    </button>
                                )
                            }
  
                        </div>
                        {
                            !questions[0].verify? 
                                <Button submit={handleVerifyQuestion}>
                                    Verificar
                                </Button>
                            :
                                <Button submit={handleNextForm}>
                                    Continuar
                                </Button>
                        }
                    </div>       
                </div> 
            </Limiter>              
        </div>
    </Theme>
  )
}

export default Questionary
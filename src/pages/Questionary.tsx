import React, { useEffect, useState } from 'react'
import Limiter from '../components/Limiter'
import Button from '../components/Button'
import Theme from '../components/Theme'
import { questionsTest } from '../test/QuestionsTest'
import Loading from '../components/Loading'
import { QuestionaryService } from './../services/QuestionaryService';
import { QuestionsModel } from '../entities/QuestionsModel';

function Questionary() {

    const [questions, setQuestions] = useState<QuestionsModel[]>([new QuestionsModel()])

    const [points, setPoints] = useState(0)

    const [loadingQuestionary, setLoadingQuestionary] = useState(false)

    const [loadingNextQuestion, setLoadingNextQuestion] = useState(false)

    const questionaryService = new QuestionaryService()

    const [formTransition, setFormTransition] = useState({
        render: true,
        opacity: false
    })

    function handleSelectQuestion(index: number) {
        if (!questions[0]?.verify) {
            const updateQuestions = [...questions]
            updateQuestions[0].alternatives.forEach(item => {
                item.selected = false
            })
            updateQuestions[0].alternatives[index].selected = true
            setQuestions(updateQuestions)
        }

    }

    function handleVerifyQuestion() {
        for (let index = 0; index < questions[0].alternatives.length; index++) {
            if (questions[0].alternatives[index].selected) {
                const updateQuestions = [...questions]

                updateQuestions[0].verify = true

                setQuestions(updateQuestions)
            }
        }  
    }

    function handleNextForm() {

        setLoadingNextQuestion(true)

        questionaryService.postAnswer(questions[0].id,100)
        .then(response=>{
            setLoadingNextQuestion(false)
            const updateQuestions = [...questions]

            updateQuestions.shift()
    
            setFormTransition({ ...formTransition, opacity: true })
    
            setTimeout(() => {
                setQuestions(updateQuestions)
                setFormTransition({ ...formTransition, opacity: false })
            }, 300);
        })
        .catch(()=>{
            setLoadingNextQuestion(true)
        })
    }

    useEffect(() => {
        questionaryService.getQuestions()
            .then((response) => {
                setQuestions(response.data.questionResponses)
                setLoadingQuestionary(true)
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
                            {
                                loadingQuestionary
                                    ?
                                    <React.Fragment>
                                        <div className='flex gap-3'>
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
                                        <div className={'gap-3 flex flex-col transition-all' + (formTransition.opacity ? " opacity-0" : " opacity-100")}>
                                            <div className='bg-purple-600  border-white border-2 rounded-lg p-5'>
                                                <p className='text-white text-md'>
                                                    {questions[0].category.description}
                                                </p>
                                            </div>
                                            <div className='gap-3 flex flex-col'>
                                                {
                                                    questions[0].alternatives.map((item, index) =>
                                                        <button
                                                            key={index}
                                                            onClick={() => handleSelectQuestion(index)}
                                                            className={
                                                                'border-2 cursor-pointer transition-all border-white  p-3 text-white font-semibold rounded-lg '
                                                                +
                                                                (
                                                                    questions[0]?.verify
                                                                        ?
                                                                        (item.isCorrect && item.selected
                                                                            ? " bg-emerald-400" :
                                                                            item.isCorrect && " bg-emerald-400" ||
                                                                            item.selected && " bg-red-400"
                                                                        )
                                                                        :
                                                                        (item.selected == true
                                                                            ?
                                                                            " bg-orange-400":
                                                                            " bg-purple-500" 
                                                                            )
                                                                )
                                                            }>
                                                            {item.description}
                                                        </button>
                                                    )
                                                }

                                            </div>
                                            {
                                                questions.length == 1 ?
                                                    questions[0].verify == true ?
                                                    <Button>
                                                        Terminar
                                                    </Button>
                                                    :
                                                    <Button submit={handleVerifyQuestion}>
                                                        Verificar
                                                    </Button>
                                                :
                                                    questions[0].verify == true ?
                                                        <Button disable={loadingNextQuestion} submit={handleNextForm}>
                                                            {
                                                                loadingNextQuestion?
                                                                    <Loading visible={true} className={"w-6 h-6"}/>
                                                                    :
                                                                    "Continuar"
                                                            }
                                                        </Button>
                                                        :
                                                        <Button submit={handleVerifyQuestion}>
                                                            Verificar
                                                        </Button>

                                            }
                                        </div>
                                    </React.Fragment>
                                    :
                                    <div className='flex justify-center items-center h-full'>
                                        <Loading visible={true} className={"w-14 h-14"}></Loading>
                                    </div>
                            }
                        </div>
                    </div>
                </Limiter>
            </div>
        </Theme>
    )
}

export default Questionary
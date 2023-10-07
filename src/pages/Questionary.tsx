import React, { useEffect, useState } from 'react'
import Limiter from '../components/Limiter'
import Button from '../components/Button'
import Theme from '../components/Theme'
import { questionsTest } from '../test/QuestionsTest'
import Loading from '../components/Loading'
import { QuestionaryService } from './../services/QuestionaryService';
import { QuestionsModel } from '../entities/QuestionsModel';
import { Link, useNavigate } from "react-router-dom";
import { QuestionaryModel } from '../entities/QuestionaryModel';


function Questionary() {

    const [questions, setQuestions] = useState<QuestionaryModel>(new QuestionaryModel())

    const navigate = useNavigate();

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
            const updateQuestions = { ...questions }
            updateQuestions.questionResponses[0].alternatives.forEach(item => {
                item.selected = false
            })
            updateQuestions.questionResponses[0].alternatives[index].selected = true
            setQuestions(updateQuestions)
        }
    }

    function handleVerifyQuestion() {
        setLoadingNextQuestion(true)

        if(!questions.questionResponses[0].verify==true) {
            window.localStorage.setItem("endQuestionTIme", new Date().toISOString())
        }

        for (let index = 0; index < questions.questionResponses[0].alternatives.length; index++) {
            if (questions.questionResponses[0].alternatives[index].selected) {
                const points = questions.questionResponses[0].alternatives.filter(item=> item.isCorrect&&item.selected)[0] ? calcPoints() : 0 

                questionaryService.postAnswer(questions.questionResponses[0].id, Math.floor(points))
                .then(() => {
                    const updateQuestions = { ...questions }

                    updateQuestions.questionResponses[0].verify = true
                    
                    setQuestions(updateQuestions)    

                    setLoadingNextQuestion(false)
                })
                .catch((error) => {
                    setLoadingNextQuestion(false)
                }) 
                break;
            }
        } 
    }

    function handleNextForm() {
        setLoadingNextQuestion(true)
        const updateQuestions = { ...questions }

        updateQuestions.punctuation = updateQuestions.punctuation + points

        updateQuestions.questionResponses.shift()

        setFormTransition({ ...formTransition, opacity: true })

        setTimeout(() => {
            setQuestions(updateQuestions)
            setFormTransition({ ...formTransition, opacity: false })
            window.localStorage.setItem("startQuestionTIme", new Date().toISOString())
            setLoadingNextQuestion(false)
        }, 300);
    }

    function handleFinishForm() {
        navigate("/ranking")
    }

    function calcPoints() {

        const maxPoints = questions.questionResponses[0].maxPunctuation

        const minPoints = questions.questionResponses[0].minPunctuation

        const expectedTimeQuestion = 20

        const endTime = new Date(String(window.localStorage.getItem("endQuestionTIme")))

        const startTime = new Date(String(window.localStorage.getItem("startQuestionTIme")))

        const elapsedTime = (endTime - startTime) / 1000;

        const timePoints = maxPoints - minPoints;

        const removePoints = (elapsedTime * timePoints) / expectedTimeQuestion;

        if (elapsedTime < expectedTimeQuestion) {
            return maxPoints - removePoints;
        } else {
            return minPoints;
        }
    }

    useEffect(() => {
        if (!window.localStorage.getItem("startQuestionTIme")) {
            window.localStorage.setItem("startQuestionTIme", new Date().toISOString())
        }
        console.log(new Date().toISOString())
        questionaryService.getQuestions()
            .then((response) => {
                setQuestions(response.data)
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
                                        questions.questionResponses.length>0
                                        ?
                                            <React.Fragment>
                                                <div className='flex gap-3'>
                                                    <p className='text-white font-semibold p-3 flex-1 border-white border-2 rounded-lg'>
                                                        {questions.questionResponses.length > 1 ?
                                                            `Faltam ${questions.questionResponses.length} perguntas`
                                                            :
                                                            `Falta ${questions.questionResponses.length} pergunta`
                                                        }
                                                    </p>
                                                    <p className='text-white font-semibold p-3 border-white border-2 rounded-lg bg-orange-400'>
                                                        PT: {String(Math.floor(questions.punctuation)).padStart(4, "0")}
                                                    </p>
                                                </div>
                                                <div className={'gap-3 flex flex-col transition-all' + (formTransition.opacity ? " opacity-0" : " opacity-100")}>
                                                    <div className='bg-purple-600  border-white border-2 rounded-lg p-5'>
                                                        <p className='text-white text-md'>
                                                            {questions.questionResponses[0].category.description}
                                                        </p>
                                                    </div>
                                                    <div className='gap-3 flex flex-col'>
                                                        {
                                                            questions.questionResponses[0].alternatives.map((item, index) =>
                                                                <button
                                                                    key={index}
                                                                    onClick={() => handleSelectQuestion(index)}
                                                                    className={
                                                                        'border-2 cursor-pointer transition-all border-white  p-3 text-white font-semibold rounded-lg '
                                                                        +
                                                                        (
                                                                            questions.questionResponses[0]?.verify
                                                                                ?
                                                                                (item.isCorrect && item.selected
                                                                                    ? " bg-emerald-400" :
                                                                                    item.isCorrect && " bg-emerald-400" ||
                                                                                    item.selected && " bg-red-400"
                                                                                )
                                                                                :
                                                                                (item.selected == true
                                                                                    ?
                                                                                    " bg-orange-400" :
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
                                                            questions.questionResponses[0].verify==true ?
                                                            
                                                            questions.questionResponses.length>1?
                                                                <Button 
                                                                    disable={loadingNextQuestion} 
                                                                    submit={handleNextForm}>
                                                                    {
                                                                        loadingNextQuestion 
                                                                        ?
                                                                        <Loading visible={true} className={"w-6 h-6"} />
                                                                        :
                                                                        "Continuar"
                                                                    }
                                                                </Button>
                                                                :
                                                                <Button submit={handleFinishForm}>
                                                                    Terminar
                                                                </Button>

                                                            :
                                                                <Button 
                                                                    disable={loadingNextQuestion} 
                                                                    submit={handleVerifyQuestion}>
                                                                   {
                                                                        loadingNextQuestion 
                                                                        ?
                                                                        <Loading visible={true} className={"w-6 h-6"} />
                                                                        :
                                                                        "Verificar"
                                                                    }
                                                                </Button>
                                                    }
                                                </div>
                                            </React.Fragment>
                                        :
                                            <div className='flex-1 flex text-white justify-center items-center gap-6 flex-col'>

                                                <div className='w-44 flex flex-col items-center justify-center gap-3'>
                                                    <p className='text-2xl'>
                                                        Opss...
                                                    </p>
                                                    <p className='text-lg'>
                                                        Parece que você não tem mais perguntas disponiveis!
                                                    </p>
                                                </div>
                                                <Link to={'/ranking'}>
                                                        <Button>
                                                            Ver ranking
                                                        </Button>
                                                </Link>
                                            </div>
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
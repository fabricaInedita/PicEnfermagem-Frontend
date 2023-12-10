import React, { Fragment, useEffect, useState } from 'react'
import Limiter from '../components/Limiter'
import Button from '../components/Button'
import Theme from '../components/Theme'
import Loading from '../components/Loading'
import { QuestionaryService } from '../services/QuestionaryService';
import { Link, useNavigate } from "react-router-dom";
import { QuestionaryModel } from '../entities/QuestionaryModel';
import { useTime, useTimer } from 'react-timer-hook'


function Questionary() {

    const [questions, setQuestions] = useState<QuestionaryModel>(new QuestionaryModel())

    const navigate = useNavigate();

    const [points, setPoints] = useState(0)

    const [loadingQuestionary, setLoadingQuestionary] = useState(false)

    const [loadingNextQuestion, setLoadingNextQuestion] = useState(false)

    const startTimer = new Date()

    startTimer.setSeconds(startTimer.getSeconds() + 600)

    const { restart, minutes, seconds } = useTimer({
        expiryTimestamp: startTimer,
        onExpire: () => handleGetForm
    })

    const [timebar, setTimeBar] = useState({ width: 0, timestemp: 0 })

    const questionaryService = new QuestionaryService()

    const [formTransition, setFormTransition] = useState({
        render: true,
        opacity: false
    })

    function handleSelectQuestion(index: number) {
        if (questions.questionResponses[0].verify !== true) {

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

        if (questions.questionResponses[0].verify !== true) {
            window.localStorage.setItem("endQuestionTIme", new Date().toISOString())
        }

        for (let index = 0; index < questions.questionResponses[0].alternatives.length; index++) {

            const [points, elapsedTime] = calcPoints()

            if (questions.questionResponses[0].alternatives[index].selected) {
                questionaryService.postAnswer(
                    questions.questionResponses[0].id,
                    points,
                    elapsedTime,
                    questions.questionResponses[0].alternatives[index].id
                )
                    .then(response => {
                        const updateQuestions = { ...questions }

                        updateQuestions.questionResponses[0].alternatives.forEach((item, index) => {
                            if (item.id == response.data.alternativeCorrectId) {

                                updateQuestions.questionResponses[0].alternatives[index].isCorrect = true
                            }
                        })

                        updateQuestions.punctuation = response.data.punctuation

                        updateQuestions.questionResponses[0].verify = true

                        setQuestions(updateQuestions)

                        setLoadingNextQuestion(false)
                    })
                    .catch((error) => {
                        console.log(error)
                        setLoadingNextQuestion(false)
                    })

                break
            }
            else if (index == questions.questionResponses[0].alternatives.length - 1) {
                setLoadingNextQuestion(false)
            }
        }
    }

    function handleNextForm() {
        setLoadingNextQuestion(true)
        const updateQuestions = { ...questions }

        updateQuestions.punctuation = updateQuestions.punctuation + points


        setFormTransition({ ...formTransition, opacity: true })

        setTimeout(() => {
            updateQuestions.questionResponses.shift()
            setQuestions(updateQuestions)
            setFormTransition({ ...formTransition, opacity: false })
            window.localStorage.setItem("startQuestionTIme", new Date().toISOString())
            setLoadingNextQuestion(false)
        }, 400);
    }

    function handleFinishForm() {
        navigate("/ranking")
    }

    function calcPoints() {

        const maxPoints = questions.questionResponses[0].maxPunctuation

        const minPoints = questions.questionResponses[0].minPunctuation

        const expectedTimeQuestion = 60

        const endTime: any = new Date(String(window.localStorage.getItem("endQuestionTIme")))

        const startTime: any = new Date(String(window.localStorage.getItem("startQuestionTIme")))

        const elapsedTime = (endTime - startTime) / 1000;

        const timePoints = maxPoints - minPoints;

        const removePoints = (elapsedTime * timePoints) / expectedTimeQuestion;

        if (elapsedTime < expectedTimeQuestion) {
            return [maxPoints - removePoints, elapsedTime];
        } else {
            return [minPoints, Math.floor(elapsedTime/1000)];
        }
    }

    function handleGetForm() {
        if (!window.localStorage.getItem("startQuestionTIme")) {
            window.localStorage.setItem("startQuestionTIme", new Date().toISOString())
        }

        questionaryService.getQuestions()
            .then(async (response) => {
                setQuestions(response.data)
                setLoadingQuestionary(true)

                const initialDate = new Date(response.data.initialFormDate)

                const currentDate: any = new Date()

                const expectedEndDate: any = new Date(initialDate.setMinutes(initialDate.getMinutes() + 40))

                const initialPorcentage = (((expectedEndDate - currentDate) / 1000 / 60) * 100) / 40

                const time = expectedEndDate - currentDate;

                setTimeBar({
                    width: Math.floor(initialPorcentage),
                    timestemp: time / initialPorcentage
                })

                restart(expectedEndDate)

                if (expectedEndDate > new Date()) {
                    setTimeout(() => {
                        handleGetForm()
                    }, time);
                }

            })
            .catch(() => {
            })
    }

    useEffect(() => {
        if (timebar.timestemp != 0)
            setTimeout(() => {
                setTimeBar({
                    width: timebar.width - 1,
                    timestemp: timebar.timestemp
                })
            }, Math.floor(timebar.timestemp));
    }, [timebar])

    useEffect(() => {
        handleGetForm()
    }, [])

    return (
        <div className='flex justify-center items-center sm:w-2/3 sl'>
            <Limiter>
                <div className='min-h-screen justify-center flex '>
                    <div className='flex-1 flex flex-col gap-3 py-20 transition-all w-full'>
                        {
                            loadingQuestionary
                                ?
                                questions.questionResponses.length > 0
                                    ?
                                    <Fragment>
                                        <div className='flex gap-3'>
                                            <p className='border-white border-2 rounded-md font-semibold h-full px-3 flex items-center text-1x text-white'>
                                                {String(minutes).padStart(2, "0")}:
                                                {String(seconds).padStart(2, "0")}
                                            </p>
                                            <div className='w-full border-white rounded-md border-2'>
                                                <div
                                                    className='h-12 bg-red-500 grad-ani rounded-md'
                                                    style={
                                                        {
                                                            width: timebar.width + "%"
                                                        }
                                                    }
                                                >
                                                </div>
                                            </div>
                                        </div>
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
                                                    {questions.questionResponses[0].statement}
                                                </p>
                                            </div>
                                            <div className='gap-3 flex flex-col'>
                                                {
                                                    questions.questionResponses[0].alternatives.map((item, index) => 
                                                        <Button
                                                            key={index}
                                                            submit={() => handleSelectQuestion(index)}
                                                            className={'border-2 cursor-pointer transition-all border-white  p-3 text-white font-semibold rounded-lg flex-col flex  '
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
                                                            <p className='text-sm text-zinc-200'>
                                                                {
                                                                    questions.questionResponses[0]?.verify
                                                                    &&
                                                                    (item.isCorrect && item.selected
                                                                        ? "Você acertou, parabéns!" :
                                                                        item.isCorrect && "Alternativa correta está aqui!" ||
                                                                        item.selected && "Que pena! Alternativa errada, continue tentando até o fim"
                                                                    )
                                                                }
                                                            </p>
                                                            <p className='text-start'>
                                                                {item.description}
                                                            </p>

                                                        </Button>

                                                    )

                                                }

                                            </div>

                                            { questions.questionResponses[0].alternatives.map((item) =>
                                                            
                                                    questions.questionResponses[0]?.verify && item.isCorrect != item.selected &&
                                                    (item.isCorrect &&
                                                        <div className='text-white border-2 p-3 rounded-lg bg-orange-300'>
                                                            <p className='font-semibold pb-2'>Justificativa:</p>
                                                            <p>{questions.questionResponses[0].explanation}</p>
                                                        </div>
                                                    ) 
                                                      
                                                )   
                                            }
                                            {
                                                questions.questionResponses[0].verify == true ?

                                                    questions.questionResponses.length > 1 ?
                                                        <Button
                                                            className="text flex justify-center items-center white p-3 bg-orange-400 border-white border-2 text-white rounded-lg "
                                                            loading={loadingNextQuestion}
                                                            disable={loadingNextQuestion}
                                                            submit={handleNextForm}>
                                                            Continuar
                                                        </Button>
                                                        :
                                                        <Button
                                                            className="text flex justify-center items-center white p-3 bg-orange-400 border-white border-2 text-white rounded-lg "
                                                            submit={handleFinishForm}>
                                                            Terminar
                                                        </Button>

                                                    :
                                                    <Button
                                                        className="text flex justify-center items-center white p-3 bg-orange-400 border-white border-2 text-white rounded-lg "
                                                        loading={loadingNextQuestion}
                                                        disable={loadingNextQuestion}
                                                        submit={handleVerifyQuestion}>
                                                        Verificar
                                                    </Button>
                                            }
                                        </div>
                                    </Fragment>
                                    :
                                    <div className='flex-1 flex text-white justify-center items-center gap-6 flex-col'>

                                        <div className='w-44 flex flex-col items-center justify-center gap-3'>
                                            <p className='text-2xl'>
                                                Opss...
                                            </p>
                                            <p className='text-lg'>
                                                Parece que você não tem mais perguntas disponíveis!
                                            </p>
                                        </div>
                                        <Link to={'/ranking'}>
                                            <Button
                                                className="text flex justify-center items-center white p-3 bg-orange-400 border-white border-2 text-white rounded-lg "
                                            >
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
    )
}

export default Questionary
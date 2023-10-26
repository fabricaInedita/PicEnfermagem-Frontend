import React, { useEffect, useState } from 'react'
import Theme from '../components/Theme'
import star from '../assets/star.svg'
import { RankingService } from '../services/RankingService'
import Loading from '../components/Loading'
import Limiter from '../components/Limiter'

function Ranking() {

    const rankingService = new RankingService()

    const [loadingRanking, setLoadingRanking] = useState(true)

    const [ranking, setRanking]:any[] = useState()

    useEffect(() => {
        rankingService.getRanking()
            .then(response => {
                console.log(response)
                setRanking(response.data)
                setLoadingRanking(false)
            })
            .catch(error => {
            })
    }, [])


    return (
        <div className='flex justify-center items-center'>
            <Limiter>
                <div className='min-h-screen justify-center flex'>
                    <div className='flex-1 flex flex-col gap-3 py-20 transition-all'>
                        {
                            loadingRanking
                                ?
                                <div className='flex justify-center items-center h-full'>
                                    <Loading visible={true} className={"w-14 h-14"}></Loading>
                                </div>
                                :
                                ranking.map((item,index)=>
                                    <div className='flex bg-purple-400 items-center justify-between text-white w-full p-3 gap-3 border-2 rounded-lg border-white'>
                                        <div className='gap-3 flex flex-col'>
                                            <p>{item.name}</p>
                                            <p>Pontuação: {Math.round(item.punctuation)}</p>
                                        </div>
                                        <div className='relative'>
                                            <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl'>{index+1}</p>
                                            <img className='w-14 h-14' src={star} alt="" />
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </Limiter>
        </div>
    )
}

export default Ranking
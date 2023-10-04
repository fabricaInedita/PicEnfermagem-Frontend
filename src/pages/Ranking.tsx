import React from 'react'
import Theme from '../components/Theme'
import star from '../assets/star.svg'

function Ranking() {
  return (
    <Theme>
        <section className=" h-screen item">
            <div className="flex flex-col items-center h-full gap-6 justify-start mt-20 px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className='flex bg-purple-400 items-center justify-between text-white w-full p-3 gap-3 border-2 rounded-lg border-white'>
                    <div className='gap-3 flex flex-col'>
                        <p>Victor Alves Farias</p>
                        <p>Pontuação: 2055</p>
                    </div>
                    <div className='relative'>
                        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl'>1</p>
                        <img className='w-14 h-14' src={star} alt="" />
                    </div>
                </div>
                <div className='flex bg-purple-400 items-center justify-between text-white w-full p-3 gap-3 border-2 rounded-lg border-white'>
                    <div className='gap-3 flex flex-col'>
                        <p>Victor Alves Farias</p>
                        <p>Pontuação: 2055</p>
                    </div>
                    <div className='relative'>
                        <p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-2xl'>1</p>
                        <img className='w-14 h-14' src={star} alt="" />
                    </div>
                </div>
            </div>
        </section>
    </Theme>
  )
}

export default Ranking
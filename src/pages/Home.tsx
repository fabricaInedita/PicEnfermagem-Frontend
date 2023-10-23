import React from 'react'
import Button from '../components/Button'
import Theme from '../components/Theme'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <Theme>
        <div className=' flex flex-col gap-10 justify-center items-center h-screen'>
          <h1 className='text-xl text-white'>Desafie suas habilidades</h1>
          <Link to={'/questionary'}>
            <Button 
              className="text flex justify-center items-center white p-3 bg-orange-400 border-white border-2 text-white rounded-lg ">
              Jogar
            </Button>
          </Link>
        </div>
    </Theme>
  )
}

export default Home
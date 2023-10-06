import React from 'react'
import Limiter from '../components/Limiter'
import Button from '../components/Button'
import Theme from '../components/Theme'
import { Link } from 'react-router-dom'

function Home() {
  return (
    
    <Theme>
        <div className=' flex flex-col gap-10 justify-center items-center h-screen'>
          <h1 className='text-xl text-white'>Desafie suas habilidades</h1>
          <Link to={'/questionary'}>
            <Button>
              Jogar
            </Button>
          </Link>
        </div>
    </Theme>
  )
}

export default Home
import { useContext, useEffect, useState } from 'react'
import React from 'react';
import { Link } from "react-router-dom";
import Gradientline from '../components/Gradientline';
import { AuthContext } from '../context/AuthContext';

function Navbar() {

  const {logout} = useContext(AuthContext)

  const [navStyle, setNavStyle] = useState(false);

  const [mobileMenuOpen,setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll:any = () => {
      if (window.scrollY > 50 && !navStyle) {
        setNavStyle(true);
      } else if (window.scrollY <= 50 && navStyle) {
        setNavStyle(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navStyle]);

  function handleLogout() {
    logout()
  }

  const {isAuthenticated}:any = useContext(AuthContext)

  return (
    isAuthenticated&&
    <React.Fragment>
      <header className='fixed w-screen transition flex top-0 left-0  justify-end pr-7 items-center z-30 h-20'>
        <div className='cursor-pointer' onClick={()=>setMobileMenuOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </div>
        <div className={`text-black fixed justify-end w-full flex top-0 h-screen transition-all ${mobileMenuOpen ? "left-0" : "left-full"}`}>
          <div className="lg:hidden w-full h-full flex " role="dialog" aria-modal="true">
            <div onClick={()=>setMobileMenuOpen(false)}  className={"flex-1  "+(mobileMenuOpen? "":" ")}></div>
            <div className="flex-col flex flex-1 inset-y-0 right-0 h-full w-10/12 overflow-y-auto bg-white dark:text-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between ">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                </a>
                <button onClick={()=>setMobileMenuOpen(false)}  type="button" className="-m-2.5 rounded-md p-2.5  text-gray-700">
                  <span className="sr-only">Close menu</span>
                  <svg  className="h-6 w-6 " fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className='text-black mt-3'>
                <Link to={'home'}>Home</Link>
                <Gradientline/>
              </div>
              <div className='text-black mt-3'>
              <Link to={'ranking'}>Ranking</Link>
                <Gradientline/>
              </div>
              <div className='text-black mt-3'>
                <Link to={'questionary'}>Quizz</Link>
                <Gradientline/>
              </div>
              <div className='flex-1 flex items-end'>
                <div className=' w-full text-black p-3 border-zinc-800 border-t '>
                  <button onClick={handleLogout}>Sair</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Navbar

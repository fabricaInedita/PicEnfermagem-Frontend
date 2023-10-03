import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useErrors } from '../utils/hooks/Errors';
import { toast } from 'react-toastify';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export interface AuthContextType {
  isAuthenticated: boolean;
  signIn: ({ email, password }: { email: string; password: string; }) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  signIn: () => {},
  logout: () => {}
});


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  
  let navigate = useNavigate();

  const token = Cookies.get('tokenTdcAdminLogin');

  const [isAuthenticated, setIsAuthenticated] = useState(/* !!token */ true);

  function signIn({ email, password }: { email: string; password: string }) {

     axios.post('https://projectpaintball.azurewebsites.net/user/login', {
        email: email,
        password: password
      })
      .then(response => {

        setIsAuthenticated(true)

        Cookies.set('tokenTdcAdminLogin', response.data.accessToken, { expires: 0.1 })

        Cookies.set('expirationTimeAccessToken', response.data.expirationTimeAccessToken, { expires: 0.1 })

        Cookies.set('expirationDateTimeAccessToken', response.data.expirationDateTimeAccessToken, { expires: 0.1 })

        toast.success("Login Completo")

        window.location.href="./"

      })
      .catch((error)=>{
        useErrors(error);
      })


  }

  useEffect(() => {

    const expirationDate:any = Cookies.get("expirationDateTimeAccessToken")

    const timeDiference = new Date(expirationDate).getTime() - new Date().getTime() 

    setTimeout(() => {
      if (token) {
        logout()
      }
   /*    else if(window.location.pathname!=="/login") {
        console.log(1)
        navigate("/login")
      } */
    }, timeDiference);

  }, [])
  
  function logout() {
    Cookies.remove('tokenTdcAdminLogin');
    Cookies.remove('expirationTimeAccessToken');
    Cookies.remove('expirationDateTimeAccessToken');
    window.location.href="./"
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};



import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useErrors } from '../utils/hooks/Errors';
import { toast } from 'react-toastify';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginService } from '../services/LoginService';

export interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (credentials: { studentCode: string; password: string }) => Promise<any>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  signIn: () => Promise.resolve(),
  logout: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  
  const navigate = useNavigate();

  const token = Cookies.get('tokenTdcAdminLogin');

  const loginService = new LoginService()

  const [isAuthenticated, setIsAuthenticated] = useState( !!token );

  async function signIn({ studentCode, password }: { studentCode: string; password: string }) {

     const result = loginService.loginPost({ studentCode, password })
      .then(response => {

        setIsAuthenticated(true)

        Cookies.set('tokenTdcAdminLogin', response.data.accessToken, { expires: 0.1 })

        Cookies.set('expirationTimeAccessToken', response.data.expirationTimeAccessToken, { expires: 0.1 })

        Cookies.set('expirationDateTimeAccessToken', response.data.expirationDateTimeAccessToken, { expires: 0.1 })

        toast.success("Login Completo")

        window.location.href="./"

      })
      .catch((error)=>{
        console.log(error)
      })

      return await result 
  }

  const authNotRequired = [
    "/login",
    "/signup",
    "/confirm-email",
    "/change-password",
    "/require-change-password"
  ]

  useEffect(() => {

    const expirationDate:any = Cookies.get("expirationDateTimeAccessToken")

    const timeDiference = new Date(expirationDate).getTime() - new Date().getTime() 

    setTimeout(() => {
      if (token) {
        logout()
      }
      else if(
        !authNotRequired.includes(window.location.pathname)
      ) {
        navigate("/login")
      } 
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



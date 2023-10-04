 
import axios from 'axios';
import { signupServiceUrl } from './api';
import { useErrors } from '../utils/hooks/Errors';

export async function signupService({studentCode,password,passwordConfirm}) {
    const result = axios.post(signupServiceUrl, 
        {
            code: studentCode,
            password: password,
            confirmPassword: passwordConfirm
        }
      )
      .then(response => {
        return response
      })
      .catch((error)=>{
        useErrors(error);
        console.log(error)
        throw error 
      })

      return await result 
}
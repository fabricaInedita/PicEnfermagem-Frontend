 
import axios from 'axios';
import { registerUserUrl } from './api';
import { useErrors } from '../utils/hooks/Errors';

export class SignupService {
    async signupPost({studentCode,password,passwordConfirm}) {
      const result = axios.post(registerUserUrl, 
          {
              username: studentCode,
              password: password,
              confirmPassword: passwordConfirm
          }
        )
        .then(response => {
          return response
        })
        .catch((error)=>{
          throw error 
        })
  
        return await result 
  }
}

 
import axios from 'axios';
import { registerUserUrl } from './api';
import { useErrors } from '../utils/hooks/Errors';

export class SignupService {
    async signupPost({studentCode,password,passwordConfirm,email}) {
      const result = axios.post(registerUserUrl, 
          { 
              email:email,
              username: studentCode,
              password: password,
              confirmPassword: passwordConfirm
          }
        )
        .then(response => {
          return response
        })
        .catch((error)=>{
          useErrors(error)
          throw error 
        })
  
        return await result 
  }
}

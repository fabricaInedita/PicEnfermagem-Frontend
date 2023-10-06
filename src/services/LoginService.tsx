import axios from "axios";
import { loginUrl } from "./api";

export class LoginService {
    loginPost({ studentCode, password }: { studentCode: string; password: string }) {
        const result = axios.post(loginUrl, {
            username: studentCode,
            password: password
          })
          .then(response => {
            console.log(response)
            return response 
          })
          .catch((error)=>{
           throw error
          })
          return result
    }
}
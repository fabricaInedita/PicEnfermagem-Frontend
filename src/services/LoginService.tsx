import axios from "axios";
import { loginUrl } from "./api";
import { useErrors } from "../utils/hooks/Errors";

export class LoginService {
    loginPost({ studentCode, password }: { studentCode: string; password: string }) {
        const result = axios.post(loginUrl, {
            username: studentCode,
            password: password
          })
          .then(response => {
            return response 
          })
          .catch((error)=>{
            useErrors(error)
            throw error
          })
          return result
    }
}
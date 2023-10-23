import axios from "axios";
import { changePassword, loginUrl, requireChangePasswordUrl, verifyEmailUrl } from "./api";
import { useErrors } from "../utils/hooks/Errors";

export class LoginService {
  async loginPost({ studentCode, password }: { studentCode: string; password: string }) {
    const result = axios.post(loginUrl, {
      username: studentCode,
      password: password
    })
      .then(response => {
        return response
      })
      .catch((error) => {
        useErrors(error)
        throw error
      })
    return result
  }
  async verifyEmail({ token, userId }: { token: string, userId: string }) {
    const result = axios.post(verifyEmailUrl,{
      token:`${token}&userId=${userId}`,
      userId: userId
    })
      .then(response => {
        return response
      })
      .catch((error) => {
        useErrors(error)
        throw error
      })
    return result
  }
  async changePassword({ password, confirmPassword,token }: { password: string, confirmPassword: string,token:string }) {
    const result = axios.patch(changePassword,{
      password:password,
      confirmPassword:confirmPassword,
      token: token
    })
      .then(response => {
        return response
      })
      .catch((error) => {
        useErrors(error)
        throw error
      })
    return result
  }
  async requireChangePassword(email:string) {
    const result = axios.post(requireChangePasswordUrl+"?email="+email)
      .then(response => {
        return response
      })
      .catch((error) => {
        useErrors(error)
        throw error
      })
    return result
  }
}
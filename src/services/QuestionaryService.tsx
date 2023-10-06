
import axios from 'axios';
import { getQuestionsUrl, postAnswerUrl } from './api';
import { useErrors } from '../utils/hooks/Errors';
import  Cookies  from 'js-cookie';

export class QuestionaryService {
    private token = Cookies.get('tokenTdcAdminLogin');

    async getQuestions() {
      const result = axios.get(getQuestionsUrl,{
        headers: {
          'Authorization': `Bearer ${this.token}` 
        }
      }) 
      .then(response => {
        console.log(response)
        return response
      })
      .catch((error)=>{
        console.log(error)
        throw error 
      })

      return await result 
    }

    async postAnswer(id:number, punctuation:number) {

      const result = axios.post(postAnswerUrl,
        {
          questionId: id,
          punctuation: punctuation
        },
        {
          headers: {
            'Authorization': `Bearer ${this.token}` 
          }
        },
      ) 
      .then(response => {
        console.log(response)
        return response
      })
      .catch((error)=>{
        console.log(error)
        throw error 
      })

      return result
    }
}

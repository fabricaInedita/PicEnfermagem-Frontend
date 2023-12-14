
import axios from 'axios';
import { getQuestionsUrl, postAnswerUrl } from './api';
import  Cookies  from 'js-cookie';
import { useErrors } from '../utils/hooks/Errors';

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
        useErrors(error)
        throw error 
      })

      return await result 
    }

    async postAnswer(id:number, punctuation:number,elapsedTime:number, alternativeId:number) {
      console.log(        {
        questionId: id,
        answerTime:elapsedTime,
        punctuation: punctuation,
        alternativeId: alternativeId
      },)
      const result = axios.post(postAnswerUrl,
        {
          questionId: id,
          answerTime:elapsedTime,
          punctuation: punctuation,
          alternativeId: alternativeId
        },
        {
          headers: {
            'Authorization': `Bearer ${this.token}` 
          }
        },
      ) 
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


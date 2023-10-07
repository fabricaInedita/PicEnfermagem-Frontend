 
import axios from 'axios';
import { getRankingUrl } from './api';
import { useErrors } from '../utils/hooks/Errors';

export class RankingService {
    async getRanking() {
      const result = axios.get(getRankingUrl)
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

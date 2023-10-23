import axios from "axios";
import { loginUrl, sendCertificateUrl } from "./api";
import { useErrors } from "../utils/hooks/Errors";
import  Cookies  from 'js-cookie';

export class CertificateService {
    private token = Cookies.get('tokenTdcAdminLogin');
    
    async sendCertificate() {
        const result = axios.post(sendCertificateUrl,{},
            {
                headers: {
                    'Authorization': `Bearer ${this.token}` 
                }
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

import axios from 'axios';
import { env } from 'env';
import { Purchase } from '@models/Purchase';

const baseURL = `${env().conectionKhipu.urlApi}/`;

const ConectionApi = () => {
    const axiosCreated = axios.create({
      baseURL: baseURL,
     
    });
    return axiosCreated;
  };
const NewPurchase = async (purchase: Purchase): Promise<NewPurchaseResponse> =>
{

    try {
        const endpoint = 'newPurchase'
        let response: NewPurchaseResponse | null = null
        let request: NewPurchaseRequest = {
        cancelUrl: env().conectionKhipu.urlPaymentCancel,
        id: purchase.id,
        notifyUrl:'',
        returnUrl: env().conectionKhipu.urlPaymentSuccess
    }
    
        let res: any = await ConectionApi().post(endpoint, request);
        
            response  = res.data as NewPurchaseResponse; 
        
    
        return response;
      } catch (error) {
     
        return {success: false, paymentId: "", urlPaymentKhipu:""}
      }
}
const ApiKhipu= {
    NewPurchase
}
export default ApiKhipu  


export interface NewPurchaseRequest {
    id: number;
    returnUrl: string;
    cancelUrl: string;
    notifyUrl: string;
}

export interface NewPurchaseResponse {
    urlPaymentKhipu: string;
    paymentId: string;
    success: boolean;
}
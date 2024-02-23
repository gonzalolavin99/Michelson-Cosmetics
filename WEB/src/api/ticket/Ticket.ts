import { Ticket } from "../../models/ticket";
import { Api } from "../conf";


const GetTicket = async () :  Promise<Ticket> => {
    const endpoint = `ticket`;
  
    let res = await Api().get(endpoint);
    console.log(res);
    return res.data;
};

const ApiTicket = {
    GetTicket
};

export default ApiTicket;
import { ResponseBase } from "./../ResponseBase";
import { Ticket } from "./../../models/ticket";
import { Api } from "../conf";

const GetTicket = async (): Promise<ResponseBase<Ticket> | undefined> => {
  try {
    const endpoint = `ticket`;

    let res: ResponseBase<Ticket> = (await Api().get(endpoint)).data;

    return res;
  } catch (error) {
    let response: ResponseBase<Ticket> = {
      Message: error,
      Success: false,
      Data: null,
      DataList: null
    };
    return response;
  }
};

const SaveTicket = async (ticket: Ticket): Promise<ResponseBase<Ticket>> => {
  try {
    const endpoint = `ticket`;

    let res: ResponseBase<Ticket> = (await Api().post(endpoint, ticket)).data;


    return res;
  } catch (error) {
    let response: ResponseBase<Ticket> = {
      Data: null,
      Success: false,
      Message: error,
      DataList: null
    };
    return response;
  }
};

const ApiTicket = {
  GetTicket,
  SaveTicket,
};

export default ApiTicket;

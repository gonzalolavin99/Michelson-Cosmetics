import { ResponseBase } from "./../ResponseBase";
import { Ticket } from "./../../models/ticket";
import { Api } from "../conf";

const GetTicket = async (): Promise<ResponseBase<Ticket> | undefined> => {
  try {
    const endpoint = `ticket`;

    let res = await Api().get(endpoint);
    let response: ResponseBase<Ticket> = {
      Data: res.data,
      State: res.status,
      Message: res.statusText,
    };
    return response;
  } catch (error) {
    let response: ResponseBase<Ticket> = {
      Message: error,
      State: 400,
      Data: null,
    };
    return response;
  }
};

const SaveTicket = async (ticket: Ticket): Promise<ResponseBase<boolean>> => {
  try {
    const endpoint = `ticket`;
    let response: ResponseBase<boolean>;

    let res = await Api().post(endpoint, ticket);

    if (res.statusText == "OK") {
      response = {
        Data: true,
        State: res.status,
        Message: res.statusText,
      };
    } else {
      response = {
        Data: false,
        State: res.status,
        Message: res.statusText,
      };
    }

    return response;
  } catch (error) {
    let response: ResponseBase<boolean> = {
      Data: false,
      State: 400,
      Message: error,
    };
    return response;
  }
};

const ApiTicket = {
  GetTicket,
  SaveTicket,
};

export default ApiTicket;

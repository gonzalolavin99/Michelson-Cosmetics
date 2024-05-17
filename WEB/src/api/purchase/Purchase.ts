import { ResponseBase } from "./../ResponseBase";
import { Ticket } from "./../../models/ticket";
import { Api } from "../conf";
import { Purchase, PurchaseRequest } from "../../models/purchase";
import { NewPurchase } from "./NewPurchase";



const CreatePurchase = async (purchase: PurchaseRequest): Promise<ResponseBase<NewPurchase>> => {
  try {
    const endpoint = `purchase`;

    let res: ResponseBase<NewPurchase> = (await Api().post(endpoint, purchase)).data;


    return res;
  } catch (error) {
    let response: ResponseBase<NewPurchase> = {
      Data: null,
      Success: false,
      Message: error,
      DataList: null
    };
    return response;
  }
};

const ApiPurchase = {
  CreatePurchase
};

export default ApiPurchase;

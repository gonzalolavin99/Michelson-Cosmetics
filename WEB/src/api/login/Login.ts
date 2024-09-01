import { ResponseBase } from "./../ResponseBase";
import { Api } from "../conf";

const Login = async (user: string, pass: string): Promise<ResponseBase<string>> => {
  try {
    const endpoint = `login`;

    let res: ResponseBase<string> = (await Api().post(endpoint, {user: user, pass: pass})).data;


    return res;
  } catch (error) {
    let response: ResponseBase<string> = {
      Data: null,
      Success: false,
      Message: error,
      DataList: null
    };
    return response;
  }
};

const ApiLogin = {
    Login
};

export default ApiLogin;

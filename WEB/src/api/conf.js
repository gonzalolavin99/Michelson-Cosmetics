import axios from "axios";
import { apiUrl } from "../enviroment";

const baseURL = `${apiUrl()}/`;
const baseAxiosJsonHeaders = () => ({
    headers: {
     
    },
  });

export const Api = () => {
    const axiosCreated = axios.create({
      baseURL: baseURL,
      headers: () => baseAxiosJsonHeaders()
    });
    return axiosCreated;
  };
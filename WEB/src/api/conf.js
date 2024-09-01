import axios from "axios";
import { apiConexion } from "../enviroment";

const baseURL = `${apiConexion().url}/`;
const baseAxiosJsonHeaders = () => ({
  headers: {},
});
export const InjectTokenHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
export const Api = () => {
  const axiosCreated = axios.create({
    baseURL: baseURL,
    headers: () => baseAxiosJsonHeaders(),
  });
  return axiosCreated;
};

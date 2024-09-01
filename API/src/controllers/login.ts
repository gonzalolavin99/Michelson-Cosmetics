import { Md5 } from "ts-md5";
import { ResponseBase } from "./utils/Response";
import { LoginRequest } from "@dto/LoginRequest";
import { AppDataSource } from "@database/db";
import { User } from "@models/User";
import {env} from "env"
import jwt, { JwtPayload } from "jsonwebtoken"
import { NextFunction, Request, Response } from "express";
export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }
const userRepository = AppDataSource.getRepository(User);
async function login(login: LoginRequest): Promise<ResponseBase<string>> {
  try {
   
    const username : string = login.user;
    const password : string = Md5.hashStr(login.pass);
    if (!username || !password) {
      return {
        Data: "",
        DataList: null,
        Message: "Usuario y contraseña son requeridos",
        Success: false,
      };
    }

    if ( await userRepository.findOne({where:{pass: password,user: username}}) != null) {
    const token = jwt.sign({ username }, env().secretKey, { expiresIn: "1h" });
      return {
        Data: token,
        DataList: null,
        Message: "Inicio de sesión exitoso",
        Success: true,
      };
    } else {
      return {
        Data: "",
        DataList: null,
        Message: "Usuario o contraseña erroneos",
        Success: false,
      };;
    }
  } catch (error) {
    return {
        Data: "",
        DataList: null,
        Message: "Error al inicar sesión "+error,
        Success: false,
      };
  }
}
function verifyToken(req: Request, res: Response, next: NextFunction) {
    const header = req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Token not provied" });
    }
    try {
      const payload = jwt.verify(token, env().secretKey);
      (req as CustomRequest).token = payload;
      return next();
    } catch (error) {
      return res.status(403).json({ message: "Token not valid" });
    }
  }


const LoginController = { login, verifyToken }
export default LoginController;
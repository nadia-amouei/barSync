import { UserModel } from './../models/modeltypes';

declare global {
  namespace Express{
    export interface Request {
      user: UserModel
    }
  }
}
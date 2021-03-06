import { IResponse } from "./Responses";

export interface Repo<T> {
  exists(t: T): Promise<IResponse<boolean>>;
  delete(t: string): Promise<IResponse<T>>;
  save(t: T): Promise<IResponse<T | void>>;
}

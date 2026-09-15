import { IUser } from "./user.interface";

export interface IAuth {
    email: string;
    password: string;
}

export type IActivate = Pick<IUser, "password"> & { confirmPassword: string };

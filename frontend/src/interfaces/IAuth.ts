import type {IUser} from "./IUser.ts";

export interface ITokenPair {
    accessToken: string;
    refreshToken: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface ILoginResponse {
    tokens: ITokenPair;
    user: IUser;
}

export interface IActivate {
    token: string;
    password: string;
    confirmPassword: string;
}
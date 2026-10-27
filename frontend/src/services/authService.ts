import type {IActivate, ILoginRequest, ILoginResponse} from "../interfaces/IAuth.ts";
import {getItems, postItem} from "./api.service.ts";
import type {IUser} from "../interfaces/IUser.ts";

export const authService = {
    login: async (body: ILoginRequest): Promise<ILoginResponse> => {
        return await postItem<ILoginResponse, ILoginRequest>("/auth/login", body);
    },

    getMe: async (): Promise<IUser> => {
      return await getItems<IUser>("/auth/me");
    },

    logout: async (body: { refreshToken: string }): Promise<void> => {
        await postItem<void, { refreshToken: string }>("/auth/logout", body);
    },

    activate: async (body: IActivate): Promise<void> => {
        await postItem<void, IActivate>("/auth/activate", body);
    },
};
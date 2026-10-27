import axios, {type AxiosError, type InternalAxiosRequestConfig} from "axios";
import {getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage} from "../utils/localStorage.ts";
import type {ITokenPair} from "../interfaces/IAuth.ts";

type RetryRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

const publicEndpoints = [
    "/auth/login",
    "/auth/refresh",
    "/auth/logout",
    "/auth/activate",
];

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use((requestConfig) => {
    if (publicEndpoints.includes(requestConfig.url ?? "")) {
        return requestConfig;
    }

    const accessToken = getFromLocalStorage<ITokenPair>("tokens")?.accessToken;

    if(accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    return requestConfig;
});

axiosInstance.interceptors.response.use(
    (response) => response,

    async (error: AxiosError) => {
        const originalRequest = error.config as RetryRequestConfig;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !publicEndpoints.includes(originalRequest.url ?? "")
        ) {
            originalRequest._retry = true;

            try {
                const tokens =
                    getFromLocalStorage<ITokenPair>(
                        "tokens",
                    );

                if (!tokens) {
                    throw new Error("Tokens not found");
                }

                const { data } =
                    await axios.post<ITokenPair>(
                        `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                        {
                            refreshToken:
                            tokens.refreshToken,
                        },
                    );

                saveToLocalStorage(
                    "tokens",
                    data,
                );

                originalRequest.headers.Authorization =
                    `Bearer ${data.accessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                removeFromLocalStorage("tokens");

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export const getItems = async <T, >(
    url: string,
    params?: unknown,
): Promise<T> => {
    const { data } = await axiosInstance.get<T>(url, {params});
    return data;
};

export const postItem = async <T, D>(
    url: string,
    body?: D,
): Promise<T> => {
    const { data } = await axiosInstance.post<T>(url, body);

    return data;
};

export const patchItem = async <T, D>(
    url: string,
    body: D,
): Promise<T> => {
    const { data } = await axiosInstance.patch<T>(url, body);

    return data;
};

export const getFile = async (url: string, params?: unknown): Promise<Blob> => {
    const { data } = await axiosInstance.get<Blob>(url, {params, responseType: "blob"});
    return data;
};
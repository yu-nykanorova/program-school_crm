import type {IUser} from "../../interfaces/IUser.ts";
import {createAsyncThunk, createSlice, isPending, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import type {ILoginRequest, ILoginResponse, ITokenPair} from "../../interfaces/IAuth.ts";
import {authService} from "../../services/authService.ts";
import {getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage} from "../../utils/localStorage.ts";
import {getError} from "../../utils/getError.ts";

type AuthSliceType = {
    user: IUser | null;
    isAuthenticated: boolean;
    isAuthChecked: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: AuthSliceType = {
    user: null,
    isAuthenticated: false,
    isAuthChecked: false,
    loading: false,
    error: null,
};

const login = createAsyncThunk(
    'authSlice/login',
    async (
        body: ILoginRequest,
        thunkAPI,
    ) => {
        try {
            const response = await authService.login(body);
            saveToLocalStorage(
                "tokens",
                response.tokens,
            );
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const loadMe = createAsyncThunk(
    'authSlice/me',
    async (
        _,
        thunkAPI,
    ) => {
        try {
            const response = await authService.getMe();
            return thunkAPI.fulfillWithValue(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const logout = createAsyncThunk(
    'authSlice/logout',
    async (_, thunkAPI) => {
        try {
            const tokens = getFromLocalStorage<ITokenPair>("tokens");
            if (tokens?.refreshToken) {
                await authService.logout({refreshToken: tokens.refreshToken});
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        } finally {
            removeFromLocalStorage("tokens");
        }

        return null;
    },
);

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setAuthChecked: (state) => {
            state.isAuthChecked = true;
        },
    },
    extraReducers: (builder) => {
        builder
            // POST /auth/login
            .addCase(
                login.fulfilled,
                (
                    state,
                    action: PayloadAction<ILoginResponse>,
                ) => {
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                    state.loading = false;
                },
            )
            // GET /auth/me
            .addCase(
                loadMe.fulfilled,
                (
                    state,
                    action: PayloadAction<IUser>
                ) => {
                    state.user = action.payload;
                    state.isAuthenticated = true;
                    state.isAuthChecked = true;
                    state.loading = false;
                },
            )
            .addCase(
                loadMe.rejected,
                (
                    state,
                    action
                ) => {
                    state.isAuthChecked = true;
                    state.isAuthenticated = false;
                    state.user = null;
                    state.loading = false;
                    state.error =
                        (action.payload as string) ??
                        "Error";
                },
            )
            // POST /auth/logout
            .addCase(
                logout.fulfilled,
                (state) => {
                    state.user = null;
                    state.isAuthenticated = false;
                    state.isAuthChecked = true;
                    state.loading = false;
                    state.error = null;
                },
            )
            // General loading
            .addMatcher(
                isPending(
                    login,
                    loadMe,
                    logout,
                ),
                (state) => {
                    state.loading = true;
                    state.error = null;
                },
            )
            .addMatcher(
                isRejected(
                    login,
                    logout,
                ),
                (
                    state,
                    action,
                ) => {
                    state.loading = false;
                    state.error =
                        (action.payload as string) ??
                        "Error";
                },
            );
    },
});

export const authSliceActions = {
    ...authSlice.actions,
    login,
    loadMe,
    logout,
};
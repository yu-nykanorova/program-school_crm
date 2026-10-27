import {createAsyncThunk, createSlice, isFulfilled, isPending, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import {getError} from "../../utils/getError.ts";
import type {IManagerCreate, IManagerWithStatistics} from "../../interfaces/IManager.ts";
import type {IOrdersStatistics} from "../../interfaces/IOrder.ts";
import type {IUserQuery} from "../../interfaces/IUser.ts";
import {adminService} from "../../services/adminService.ts";
import type {IPaginatedResponse} from "../../interfaces/IPaginatedResponse.ts";

type AdminSliceType = {
    managers: IManagerWithStatistics[];
    totalPages: number;
    totalItems: number;
    prevPage: boolean;
    nextPage: boolean;
    statistics: IOrdersStatistics | null;
    managersLoading: boolean;
    statisticsLoading: boolean;
    managersError: string | null;
    statisticsError: string | null;
    actionError: string | null;
};

const initialState: AdminSliceType = {
    managers: [],
    totalPages: 1,
    totalItems: 0,
    prevPage: false,
    nextPage: false,
    statistics: null,
    managersLoading: false,
    statisticsLoading: false,
    managersError: null,
    statisticsError: null,
    actionError: null,
};

const loadManagers = createAsyncThunk(
    'adminSlice/loadManagers',
    async (params: IUserQuery | undefined, thunkAPI) => {
        try {
            const managers = await adminService.getManagers(params);

            return thunkAPI.fulfillWithValue(managers);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const createManager = createAsyncThunk(
    'adminSlice/createManager',
    async (
        body: IManagerCreate,
        thunkAPI,
    ) => {
        try {
            const manager =
                await adminService.createManager(body);

            return thunkAPI.fulfillWithValue(manager);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const banManager = createAsyncThunk(
    'adminSlice/banManager',
    async (
        id: string,
        thunkAPI,
    ) => {
        try {
            const status = await adminService.banManager(id);
            return thunkAPI.fulfillWithValue(status);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const unbanManager = createAsyncThunk(
    'adminSlice/unbanManager',
    async (
        id: string,
        thunkAPI,
    ) => {
        try {
            const status = await adminService.unbanManager(id);
            return thunkAPI.fulfillWithValue(status);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const loadOrdersStatistics = createAsyncThunk(
    'adminSlice/loadOrdersStatistics',
    async (
        _,
        thunkAPI,
    ) => {
        try {
            const statistics =
                await adminService.getOrdersStatistics();

            return thunkAPI.fulfillWithValue(statistics);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);


export const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET /managers
            .addCase(
                loadManagers.pending,
                (
                    state
                ) => {
                    state.managersLoading = true;
                    state.managersError = null;
                }
            )
            .addCase(
                loadManagers.fulfilled,
                (
                    state,
                    action: PayloadAction<IPaginatedResponse<IManagerWithStatistics>>,
                ) => {
                    state.managers = action.payload.data;
                    state.totalPages = action.payload.totalPages;
                    state.totalItems = action.payload.totalItems;
                    state.prevPage = action.payload.prevPage;
                    state.nextPage = action.payload.nextPage;
                    state.managersLoading = false;
                },
            )
            .addCase(
                loadManagers.rejected,
                (
                    state,
                    action,
                ) => {
                    state.managersLoading = false;
                    state.managersError =
                        (action.payload as string) ?? "Error";
                }
            )
            // GET orders statistics
            .addCase(
                loadOrdersStatistics.pending,
                (
                    state
                ) => {
                    state.statisticsLoading = true;
                    state.statisticsError = null;
                }
            )
            .addCase(
                loadOrdersStatistics.fulfilled,
                (
                    state,
                    action: PayloadAction<IOrdersStatistics>,
                ) => {
                    state.statistics = action.payload;
                    state.statisticsLoading = false;
                },
            )
            .addCase(
                loadOrdersStatistics.rejected,
                (
                    state,
                    action,
                ) => {
                    state.statisticsLoading = false;
                    state.statisticsError =
                        (action.payload as string) ?? "Error";
                }
            )
            // Fulfilled ban/unban manager
            .addMatcher(
                isFulfilled(banManager, unbanManager),
                (state, action) => {
                    const manager = state.managers.find(
                        manager => manager._id === action.payload._id,
                    );

                    if (manager) {
                        manager.status = action.payload.status;
                    }

                    state.managersLoading = false;
                }
            )
            // Errors ban/unban and create manager
            .addMatcher(
                isPending(createManager, banManager, unbanManager),
                (state) => {
                    state.actionError = null;
                }
            )
            .addMatcher(
                isRejected(createManager, banManager, unbanManager),
                (state, action) => {
                    state.actionError =
                        (action.payload as string) ?? "Error";
                },
            )
    },
});

export const adminSliceActions = {
    ...adminSlice.actions,
    loadManagers,
    createManager,
    banManager,
    unbanManager,
    loadOrdersStatistics,
};
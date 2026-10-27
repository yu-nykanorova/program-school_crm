import {createAsyncThunk, createSlice, isPending, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import type {IOrder, IOrderEdit, IOrderQuery} from "../../interfaces/IOrder.ts";
import {getError} from "../../utils/getError.ts";
import {orderService} from "../../services/orderService.ts";
import type {ICommentCreate} from "../../interfaces/IComment.ts";
import type {IPaginatedResponse} from "../../interfaces/IPaginatedResponse.ts";
import type {IOrderManager} from "../../interfaces/IManager.ts";

type OrderSliceType = {
    orders: IOrder[];
    totalPages: number;
    totalItems: number;
    prevPage: boolean;
    nextPage: boolean;
    loading: boolean;
    error: string | null;
};

const initialState: OrderSliceType = {
    orders: [],
    totalPages: 1,
    totalItems: 0,
    prevPage: false,
    nextPage: false,
    loading: false,
    error: null,
};

const loadOrders = createAsyncThunk(
    'orderSlice/loadOrders',
    async (params: IOrderQuery | undefined, thunkAPI) => {
        try {
            const orders = await orderService.getOrders(params);

            return thunkAPI.fulfillWithValue(orders);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const editOrder = createAsyncThunk(
    'orderSlice/editOrder',
    async (
        params: {
            id: string;
            body: IOrderEdit;
        },
        thunkAPI,
    ) => {
        try {
            const order =
                await orderService.editOrder(
                    params.id,
                    params.body,
                );

            return thunkAPI.fulfillWithValue(order);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

const createComment = createAsyncThunk(
    'orderSlice/createComment',
    async (
        params: {
            id: string;
            body: ICommentCreate;
        },
        thunkAPI,
    ) => {
        try {
            const order =
                await orderService.createComment(params.id, params.body);

            return thunkAPI.fulfillWithValue(order);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setOrderManager: (
            state,
            action: PayloadAction<{
                orderId: string;
                manager: IOrderManager;
            }>
        ) => {
            const order = state.orders.find((item) => item.databaseId === action.payload.orderId);
            if (order && !order.manager) {
                order.manager = action.payload.manager;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // GET /orders
            .addCase(
                loadOrders.fulfilled,
                (
                    state,
                    action: PayloadAction<IPaginatedResponse<IOrder>>,
                ) => {
                    state.orders = action.payload.data;
                    state.totalPages = action.payload.totalPages;
                    state.totalItems = action.payload.totalItems;
                    state.prevPage = action.payload.prevPage;
                    state.nextPage = action.payload.nextPage;
                    state.loading = false;
                },
            )
            // POST /orders/:id
            .addCase(
                editOrder.fulfilled,
                (state, action: PayloadAction<IOrder>) => {
                    const updatedOrder = action.payload;

                    const index = state.orders.findIndex(
                        (order) => order.databaseId === updatedOrder.databaseId,
                    );

                    if (index !== -1) {
                       state.orders[index] = updatedOrder;
                    }

                    state.loading = false;
                },
            )
            // POST /orders/:id/comments
            .addCase(
                createComment.fulfilled,
                (
                    state,
                    action,
                ) => {
                    const updatedOrder = action.payload;

                    const index = state.orders.findIndex(order => order.databaseId === updatedOrder.databaseId);

                    if (index !== -1) {
                        state.orders[index] = updatedOrder;
                    }
                    state.loading = false;
                },
            )
            // Loading and errors
            .addMatcher(
                isPending(loadOrders, editOrder),
                (state) => {
                    state.loading = true;
                    state.error = null;
                },
            )
            .addMatcher(
                isRejected(loadOrders, editOrder),
                (state, action) => {
                    state.loading = false;
                    state.error =
                        (action.payload as string) ?? "Error";
                },
            )
    },
});

export const orderSliceActions = {
    ...orderSlice.actions,
    loadOrders,
    editOrder,
    createComment,
};
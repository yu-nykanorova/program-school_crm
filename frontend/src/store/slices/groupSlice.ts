import type {IGroup, IGroupCreate} from "../../interfaces/IGroup.ts";
import {createAsyncThunk, createSlice, isPending, isRejected, type PayloadAction} from "@reduxjs/toolkit";
import {groupService} from "../../services/groupService.ts";
import {getError} from "../../utils/getError.ts";

type GroupSliceType = {
    groups: IGroup[];
    loading: boolean;
    error: string | null;
};

const initialState: GroupSliceType = {
    groups: [],
    loading: false,
    error: null,
};

const loadGroups = createAsyncThunk(
    "groupSlice/loadGroups",
    async (_, thunkAPI) => {
        try {
            const groups = await groupService.getGroups();

            return thunkAPI.fulfillWithValue(groups);
        } catch (error) {
            return thunkAPI.rejectWithValue(getError(error));
        }
    },
);

const createGroup = createAsyncThunk(
    'groupSlice/createGroup',
    async (
        body: IGroupCreate,
        thunkAPI,
    ) => {
        try {
            const group =
                await groupService.createGroup(body);

            return thunkAPI.fulfillWithValue(group);
        } catch (error) {
            return thunkAPI.rejectWithValue(
                getError(error),
            );
        }
    },
);

export const groupSlice = createSlice({
    name: "groupSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // GET /groups
            .addCase(
                loadGroups.fulfilled,
                (
                    state,
                    action: PayloadAction<IGroup[]>,
                ) => {
                    state.groups = action.payload;
                    state.loading = false;
                },
            )
            // POST /groups - create group
            .addCase(
                createGroup.fulfilled,
                (state) => {
                    state.loading = false;
                },
            )
            // Loading and errors
            .addMatcher(
                isPending(loadGroups, createGroup),
                (state) => {
                    state.loading = true;
                    state.error = null;
                },
            )
            .addMatcher(
                isRejected(loadGroups, createGroup),
                (state, action) => {
                    state.loading = false;
                    state.error =
                        (action.payload as string) ?? "Error";
                },
            )
    },
});

export const groupSliceActions = {
    ...groupSlice.actions,
    loadGroups,
    createGroup,
};
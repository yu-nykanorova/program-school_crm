import type {IApiOrder, IOrder, IOrderBaseQuery, IOrderEdit, IOrderQuery} from "../interfaces/IOrder.ts";
import {getFile, getItems, patchItem, postItem} from "./api.service.ts";
import type {ICommentCreate} from "../interfaces/IComment.ts";
import type {IPaginatedResponse} from "../interfaces/IPaginatedResponse.ts";

const mapOrder = (order: IApiOrder): IOrder => {
    const { _id, ...rest } = order;

    return {
        ...rest,
        databaseId: _id,
    }
}

export const orderService = {
    getOrders: async (query?: IOrderQuery): Promise<IPaginatedResponse<IOrder>> => {
      const response = await getItems<IPaginatedResponse<IApiOrder>>("/orders", query);
      return {
          ...response,
          data: response.data.map((item) => mapOrder(item)),
      };
    },

    getOrdersExport: async (query?: IOrderBaseQuery): Promise<Blob> => {
        return await getFile("/orders/export", query);
    },

    editOrder: async (id: string, body: IOrderEdit): Promise<IOrder> => {
        const response = await patchItem<IApiOrder, IOrderEdit>(`/orders/${id}`, body);

        return mapOrder(response);
    },

    createComment: async (id: string, body: ICommentCreate): Promise<IOrder> => {
        const response = await postItem<IApiOrder, ICommentCreate>(`/orders/${id}/comments`, body);

        return mapOrder(response);
    },
};
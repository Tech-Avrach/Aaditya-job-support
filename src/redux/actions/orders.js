import {
    RETRIEVE_ORDERS,
} from "./types";

import OrdersService from "../services/orders.service";


export const retrieveOrders = (params) => async (dispatch) => {
    try {
        const res = await OrdersService.getAll(params);
        console.log(res);
        dispatch({
            type: RETRIEVE_ORDERS,
            payload: res.data.orderListInfo,
        });
    } catch (err) {
        console.log(err);
    }
}
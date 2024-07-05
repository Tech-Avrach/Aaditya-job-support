
import {
    CREATE_BOOSTERPLAN,
    RETRIEVE_BOOSTERPLAN,
    UPDATE_BOOSTERPLAN,
    DELETE_BOOSTERPLAN,
    RESTORE_BOOSTERPLAN,
    PURCHASE_BOOSTERPLAN,
} from "../types";

import BoosterplanService from "../../redux/services/boosterplan";

export const createBoosterplan = (data) => async (dispatch) => {
    try {
        const res = await BoosterplanService.create(data);
        dispatch({
            type: CREATE_BOOSTERPLAN,
            payload: res.data.listBoosterPlan,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveBoosterplan = (param) => async (dispatch) => {
    try {
        const res = await BoosterplanService.getAll(param);
        dispatch({
            type: RETRIEVE_BOOSTERPLAN,
            payload: res.data.listBoosterPlan,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateBoosterplan = (id, data) => async (dispatch) => {
    try {
        const res = await BoosterplanService.update(id, data);
        dispatch({
            type: UPDATE_BOOSTERPLAN,
            payload: res.data.listBoosterPlan,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteBoosterplan = (id) => async (dispatch) => {
    try {
        const res = await BoosterplanService.deleteBoosterplan(id);
        dispatch({
            type: DELETE_BOOSTERPLAN,
            payload: res.data.listBoosterPlan,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const restoreBoosterplan = (id) => async (dispatch) => {
    try {
        const res = await BoosterplanService.restore(id);
        dispatch({
            type: RESTORE_BOOSTERPLAN,
            payload: res.data.listBoosterPlan,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const purchaseBoosterplan = (id) => async (dispatch) => {
    try {
        const res = await BoosterplanService.purchase(id);
        dispatch({
            type: PURCHASE_BOOSTERPLAN,
            payload: res.data.listBoosterPlan,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

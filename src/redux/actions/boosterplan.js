
import {
    CREATE_BOOSTERPLAN,
    RETRIEVE_BOOSTERPLAN,
    UPDATE_BOOSTERPLAN,
    DELETE_BOOSTERPLAN,
    RESTORE_BOOSTERPLAN,
} from "./types";

import BoosterplanService from "../services/boosterPlan.service";

export const createBoosterplan = (data, param) => async (dispatch) => {
    try {
        const res = await BoosterplanService.create(data, param);
        // dispatch({
        //     type: CREATE_BOOSTERPLAN,
        //     payload: res.data.listBoosterPlan,
        // });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveBoosterplan = (param) => async (dispatch) => {
    try {
        const res = await BoosterplanService.getAll(param);
        console.log("booster plan list",res.data.BoosterPlanList);
        dispatch({
            type: RETRIEVE_BOOSTERPLAN,
            payload: res.data.BoosterPlanList,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const updateBoosterplan = (id, data, param) => async (dispatch) => {
    try {
        const res = await BoosterplanService.update(id, data, param);
        console.log("update booster plan", res)
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
        console.log("delete booster plan", res)
        dispatch({
            type: DELETE_BOOSTERPLAN,
            payload: res.data.BoosterPlanList,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const restoreBoosterplan = (id) => async (dispatch) => {
    try {
        const res = await BoosterplanService.restore(id);
        console.log("restore booster plan", res)
        dispatch({
            type: RESTORE_BOOSTERPLAN,
            payload: res.data.BoosterPlanList,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};


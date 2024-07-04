import {
    RETRIEVE_CMS,
    CREATE_CMS,
    UPDATE_CMS,
    DELETE_CMS,
    RESTORE_CMS,
} from "./types";

import CmsService from "../services/cms.service";

export const retrieveCms = (param) => {
    return (dispatch) => {
        CmsService.getAll(param)
            .then((response) => {
                console.log('retrieved',response)
                dispatch({
                    type: RETRIEVE_CMS,
                    payload: response.data.listPages,
                });
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const createCms = (data) => async (dispatch) => {
    try {
      const response = await CmsService.create(data);
      console.log('created',response)
      dispatch({
        type: CREATE_CMS,
        payload: response.data.pageInfo,
      });
      return Promise.resolve(response.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };


export const updateCms = (id, data) => {
    return (dispatch) => {
       return CmsService.update(id, data)
            .then((response) => {
                console.log('updated',response)
                dispatch({
                    type: UPDATE_CMS,
                    payload: response.data.listPages,
                });
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const deleteCms = (id) => {
    return (dispatch) => {
        return CmsService.deleteCms(id)  // <-- Ensure this returns a Promise
            .then((response) => {
                console.log('deleted',response.data.pageInfo)
                dispatch({
                    type: DELETE_CMS,
                    payload: response.data.pageInfo,
                });
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const restoreCms = (id) => {
    return (dispatch) => {
        return CmsService.restore(id)  // <-- Ensure this returns a Promise
            .then((response) => {
                console.log('restore',response.data.pageInfo)
                dispatch({
                    type: RESTORE_CMS,
                    payload: response.data.pageInfo,
                });
                return Promise.resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
};
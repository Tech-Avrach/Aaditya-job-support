import {
  CREATE_ROLE,
  RETRIEVE_ROLE,
  CREATE_PERMISSION,
  RETRIEVE_PERMISSION,
  RETRIEVE_SINGAL_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  RESTORE_ROLE,
  UPDATE_ROLES_STATUS,
} from "./types";

import RoleService from "../../redux/services/role.service";


export const retrieveRole =
  (keyword = "", page = "", perPage = "", all = true) =>
  async (dispatch) => {
    try {
      const res = await RoleService.getAll(keyword, page, perPage, all);
      dispatch({
        type: RETRIEVE_ROLE,
        payload: res.data.rolesList,
      });
    } catch (err) {
      console.log(err);
    }
  };

export const retrieveSingaleRole = () => async (dispatch) => {
  try {
    const res = await RoleService.get();
    dispatch({
      type: RETRIEVE_SINGAL_ROLE,
      payload: res.data.pageInfo,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateRole = (id, data) => async (dispatch) => {
  try {
    const res = await RoleService.update(id, data);

    dispatch({
      type: UPDATE_ROLE,
      payload: res.data.roleInfo,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const createRole = (data) => async (dispatch) => {
  try {
    const res = await RoleService.createrole(data);

    dispatch({
      type: CREATE_ROLE,
      payload: res?.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
export const getPermission = () => async (dispatch) => {
  try {
    const res = await RoleService.getpermission();

    dispatch({
      type: RETRIEVE_PERMISSION,
      payload: res?.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const addPermission = (data) => async (dispatch) => {
  try {
    const res = await RoleService.addpermission(data);

    dispatch({
      type: CREATE_PERMISSION,
      payload: res.data.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteRole = (id) => async (dispatch) => {
  try {
    const res = await RoleService.deleteUser(id);
    dispatch({
      type: DELETE_ROLE,
      payload: res.data.rolesList?.rows,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const restoreRole = (id) => async (dispatch) => {
  try {
    const res = await RoleService.restore(id);

    dispatch({
      type: RESTORE_ROLE,
      payload: res.data.rolesList?.rows,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

// Active and Inactive status Code 
export const activeStatusRole = (id, Active) => async (dispatch) => {
  try {
    const res = await RoleService.isActiveroles(id, Active);

    dispatch({
      type: UPDATE_ROLES_STATUS,
      payload: res.data.rolesList.rows,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

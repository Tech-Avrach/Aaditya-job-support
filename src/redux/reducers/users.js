import {
  RETRIEVE_USERS,
  RETRIEVE_SINGALE_USER,
  UPDATE_USER,
  UPDATE_USER_STATUS,
  RESTORE_USER,
  DELETE_USER,
  CREATE_USER,
  ADD_USER_SUPERADMIN,
} from "../actions/types";

const initialState = { users: [], totalUserCount: 0 };

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_USERS:
      return {
        users: payload.rows,
        totalUserCount: payload.count,
      };

    case RETRIEVE_SINGALE_USER:
      return payload;

    case CREATE_USER:
      return payload;

    case UPDATE_USER:
      return payload;

    case UPDATE_USER_STATUS:
      const updated = state.users?.map((item) =>
        item.id === payload.id ? payload : item
      );
      return {
        users: updated,
        totalUserCount: state.totalUserCount,
      };

    case DELETE_USER:
      const remainData = state.users?.map((item) =>
        item.id === payload.id ? payload : item
      );
      return {
        ...state,
        users: remainData,
        totalUserCount: state.totalUserCount,
      };

    case RESTORE_USER:
      const restored = state.users?.map((item) =>
        item.id === payload.id ? payload : item
      );
      return {
        users: restored,
        totalUserCount: state.totalUserCount,
      };

    case ADD_USER_SUPERADMIN:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;

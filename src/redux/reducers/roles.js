import {
  CREATE_ROLE,
  RETRIEVE_ROLE,
  CREATE_PERMISSION,
  RETRIEVE_SINGAL_ROLE,
  UPDATE_ROLE,
  RESTORE_ROLE,
  DELETE_ROLE,
  UPDATE_ROLES_STATUS
} from "../actions/types";

const initialState = { role: [], totalRolecount: 0 , isActive:0};
const filterRoles = roles => roles.filter(role => role.id !== 1);

const roleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_ROLE:
      // Filter out the role with id 1
      const filteredRoles = filterRoles(payload.rows);
      return {
        role: filteredRoles,
        totalRolecount: filteredRoles.length,
      };

    case RETRIEVE_SINGAL_ROLE:
      return {
        ...state,
      };

    case UPDATE_ROLE:
      return {
        ...state,
        role: state.role.map((item) => 
          item.id === payload.id ? payload : item
        ).filter(role => role.id !== 1),
      };

    case CREATE_ROLE:
      return {
        ...state,
        role: [payload, ...state.role].filter(role => role.id !== 1),
        totalRolecount: state.role.length + 1,
      };

    case CREATE_PERMISSION:
      return {
        ...state,
      };

    case DELETE_ROLE:
      // const remainData = state.role.map((item) =>
      //   item.id === payload.id ? payload : item
      // );
      return {
        ...state,
        role: payload,
      };

    case RESTORE_ROLE:
      // const restored = state.role.map((item) =>
      //   item.id === payload.id ? payload : item
      // );
      return {
        ...state,
        role: payload,
      };

      case UPDATE_ROLES_STATUS:
        return {
          ...state,
          role: filterRoles(payload),
        };

    default:
      return state;
  }
};

export default roleReducer;

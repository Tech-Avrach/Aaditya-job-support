import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REFRESH_SUCCESS, REFRESH_FAIL } from "../actions/types";

const user = JSON.parse(localStorage.getItem("_gmp"));

const getPermissionMap = (permission) => {
  let moduleAccessMap = {}
  permission.forEach(element => {
    moduleAccessMap[element.moduleId] = {
      "create": element.create,
      "read": element.read,
      "update": element.update,
      "delete": element.delete,
      "restore": element.restore,
      "statusUpdate": element.statusUpdate
    }
  });

  return moduleAccessMap
}

const initialState = user
  ? { isLoggedIn: true, user, permissionMap: getPermissionMap(user.permission) }
  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      // let permissionMap = getPermissionMap(payload.user.permission);
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        // permissionMap
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case REFRESH_SUCCESS:
      return {
        ...state,
      };
    case REFRESH_FAIL:
      return {
        ...state,
      };

    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}

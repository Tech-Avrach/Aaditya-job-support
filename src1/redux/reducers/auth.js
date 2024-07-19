import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REFRESH_SUCCESS, REFRESH_FAIL, CURRENT_USER_UPDATE } from "../actions/types";
import CryptoJS from "crypto-js";
import forge from "node-forge";
import Cookies from "js-cookie";

const user = JSON.parse(localStorage.getItem("_gmp"));

// const getPermissionMap = (permission) => {
//   let moduleAccessMap = {}
//   permission?.forEach(element => {
//     moduleAccessMap[element.moduleId] = {
//       "create": element.create,
//       "read": element.read,
//       "update": element.update,
//       "delete": element.delete,
//       "restore": element.restore,
//       "statusUpdate": element.statusUpdate
//     }
//   });

//   return moduleAccessMap
// }

const getPermissionMap = () => {
  const ENCRYPTED_ASE_KEY = Cookies.get('ENCRYPTED_ASE_KEY');
  const PERMISSION_DATA = Cookies.get('PERMISSION_DATA');
  const IV = Cookies.get('IV');

  if (!ENCRYPTED_ASE_KEY || !PERMISSION_DATA || !IV) {
      console.warn("Missing one or more required cookies: ENCRYPTED_ASE_KEY, PERMISSION_DATA, IV");
      return null; 
  }

  const decryptAESKeyWithRSA = (ENCRYPTED_ASE_KEY) => {
      try {
          const privateKey = forge.pki.privateKeyFromPem(process.env.REACT_APP_PRIVATE_KEY);
          const encryptedBuffer = forge.util.decode64(ENCRYPTED_ASE_KEY);
          const decryptedKey = privateKey.decrypt(encryptedBuffer, "RSA-OAEP");
          return forge.util.encode64(decryptedKey);
      } catch (error) {
          console.error("Error decrypting AES key with RSA:", error);
          return null; 
      }
  };

  const decryptWithAES = (PERMISSION_DATA, key, IV) => {
      try {
          const decrypted = CryptoJS.AES.decrypt(
              PERMISSION_DATA,
              CryptoJS.enc.Base64.parse(key),
              {
                  iv: CryptoJS.enc.Base64.parse(IV),
                  mode: CryptoJS.mode.CBC,
                  padding: CryptoJS.pad.Pkcs7,
              }
          );
          return JSON.parse(CryptoJS.enc.Utf8.stringify(decrypted));
      } catch (error) {
          console.error("Error decrypting permission data with AES:", error);
          return null; 
      }
  };

  const DECRYPTED_ASE_KEY = decryptAESKeyWithRSA(ENCRYPTED_ASE_KEY);
  if (!DECRYPTED_ASE_KEY) {
      return null; 
  }

  const DECRYPTED_PERMISSION = decryptWithAES(PERMISSION_DATA, DECRYPTED_ASE_KEY, IV);
  if (!DECRYPTED_PERMISSION) {
      return null; 
  }

  return DECRYPTED_PERMISSION;
};

// console.log("permission",getPermissionMap1());

const initialState = user
  ? { isLoggedIn: true, user, permissionMap: getPermissionMap() }
  // ? { isLoggedIn: true, user }

  : { isLoggedIn: false, user: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      let permissionMap = getPermissionMap();
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        permissionMap
      };
    case CURRENT_USER_UPDATE:
      // let permissionMap = getPermissionMap(payload.user.permission);
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        },
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

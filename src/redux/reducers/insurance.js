import {
    CREATE_INSURANCE,
    RETRIEVE_INSURANCE,
    UPDATE_INSURANCE,
    DELETE_INSURANCE,
    RESTORE_INSURANCE
} from "../actions/types";

const initialState = { insurance: [], totalInsurancecount: 0 };
  
  const insuranceReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_INSURANCE:
        // Filter out the role with id 1
          return {
          insurance: payload.rows,
          totalInsurancecount: payload.count,
          };
  
        case UPDATE_INSURANCE:
          return {
              ...state,
              insurance: state.insurance.map((item) =>
                item.publicId === action.payload?.publicId ? action.payload : item
              ),
            };
  
      case CREATE_INSURANCE:
          return {
          ...state,
          insurance: [...state.insurance, payload],
          totalInsurancecount: state.insurance.length + 1,
          };
  
        case DELETE_INSURANCE:
          // const remainData = state.role.map((item) =>
          //   item.id === payload.id ? payload : item
          // );
          return {
            ...state,
            insurance: payload.rows,
            totalInsurancecount: payload.count,
          };
  
        case RESTORE_INSURANCE:
          // const restored = state.role.map((item) =>
          //   item.id === payload.id ? payload : item
          // );
          return {
            ...state,
            insurance: payload.rows,
            totalInsurancecount: payload.count,
          };
  
      default:
        return state;
    }
  };
  
  export default insuranceReducer;
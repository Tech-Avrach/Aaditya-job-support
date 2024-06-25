import {
    RETRIEVE_RULES,
    CREATE_RULES,
    UPDATE_RULES,
    DELETE_RULES,
    UPDATE_RULES_STATUS,
    RESTORE_RULES,
  } from "../actions/types";

  const initialState = { rules: [], totalRulecount: 0 };

  const ruleReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case RETRIEVE_RULES:
        // Filter out the role with id 1
        return {
            rules: payload.rows,
          totalRulecount: payload.count,
        };
  
  
      case UPDATE_RULES:
        return {
            ...state,
            rules: state.rules.map((item) => 
              item.publicId === action.payload.publicId ? action.payload : item
            ),
          };
  
      case CREATE_RULES:
        return {
          ...state,
          rules: [...state.rules, payload],
          totalRulecount: state.rules.length + 1,
        };

  
      case DELETE_RULES:
        // const remainData = state.role.map((item) =>
        //   item.id === payload.id ? payload : item
        // );
        return {
          ...state,
          rules: payload,
          totalRulecount: state.rules.length,
        };
  
      case RESTORE_RULES:
        // const restored = state.role.map((item) =>
        //   item.id === payload.id ? payload : item
        // );
        return {
          ...state,
          rules: payload,
        };
  
        case UPDATE_RULES_STATUS:
          return {
            ...state,
            rules: payload,
          };
  
      default:
        return state;
    }
  };
  
  export default ruleReducer;
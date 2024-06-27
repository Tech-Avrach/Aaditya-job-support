import {
  RETRIEVE_FAQ,
  CREATE_FAQ,
  UPDATE_FAQ,
  DELETE_FAQ,
  RESTORE_FAQ,
  UPDATE_FAQ_STATUS,
} from "../actions/types";

const initialState = { faqs: [], totalFaqscount: 0 };

const faqReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_FAQ:
      // Filter out the role with id 1
        return {
        faqs: payload.rows,
        totalFaqscount: payload.count,
        };

      case UPDATE_FAQ:
        return {
            ...state,
            faqs: state.faqs.map((item) =>
              item.publicId === action.payload.publicId ? action.payload : item
            ),
          };

    case CREATE_FAQ:
        return {
        ...state,
        faqs: [...state.faqs, payload],
        totalFaqscount: state.faqs.length + 1,
        };

      case DELETE_FAQ:
        // const remainData = state.role.map((item) =>
        //   item.id === payload.id ? payload : item
        // );
        return {
          ...state,
          faqs: payload,
          totalRulecount: state.faqs.length,
        };

      case RESTORE_FAQ:
        // const restored = state.role.map((item) =>
        //   item.id === payload.id ? payload : item
        // );
        return {
          ...state,
          faqs: payload,
        };

        case UPDATE_FAQ_STATUS:
          return {
            ...state,
            faqs: payload,
          };

    default:
      return state;
  }
};

export default faqReducer;

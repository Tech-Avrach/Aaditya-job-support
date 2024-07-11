import { CREATE_DISPUTE, DELETE_DISPUTE, RESTORE_DISPUTE, RETRIEVE_DISPUTE, UPDATE_DISPUTE_STATUS } from "../actions/types";

const initialState = { dispute: [], totalDisputeCount: 0 };

const disputeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case RETRIEVE_DISPUTE:
      return {
        dispute: payload.rows,
        totalDisputeCount: payload.count,
      };
    
    case UPDATE_DISPUTE_STATUS:
      return {
        dispute: payload.rows,
        totalDisputeCount: payload.count,
      }
      case DELETE_DISPUTE:
        console.log(payload);
        return {
          dispute: payload.rows,
          totalDisputeCount: payload.count,
        }
        case RESTORE_DISPUTE:
          return {
            dispute: payload.rows,
            totalDisputeCount: payload.count,
          }
    
  
    default:
      return state;
  }
};

export default disputeReducer;

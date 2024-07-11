import {
    RETRIEVE_BOOSTERPLAN,
    UPDATE_BOOSTERPLAN,
    DELETE_BOOSTERPLAN,
    RESTORE_BOOSTERPLAN,
    CREATE_BOOSTERPLAN
} from "../actions/types";

const initialState = { boosterPlan: [], totalBoosterPlanCount: 0 };

const boosterPlan = (state = initialState, action) => {
    const { type, payload } = action;                                   

    switch (type) {
        case RETRIEVE_BOOSTERPLAN:
            return {
                boosterPlan: payload.rows,
                totalBoosterPlanCount: payload.count,
            };  

        case CREATE_BOOSTERPLAN:
            return {
                ...state,
                boosterPlan: [...state.boosterPlan, payload],
                totalBoosterPlanCount: state.boosterPlan.length + 1,
            };
        case UPDATE_BOOSTERPLAN:
            return {
                ...state,
                boosterPlan: state.boosterPlan.map((item) =>
                    item.publicId === action.payload?.publicId
                        ? action.payload
                        : item
                ),
            };
        case DELETE_BOOSTERPLAN:
            return {
                boosterPlan: payload.rows,
                totalBoosterPlanCount: payload.count,
            };  
        case RESTORE_BOOSTERPLAN:
            return {
                boosterPlan: payload.rows,
                totalBoosterPlanCount: payload.count,
            }; 
        default:
            return state;
    }
}   

export default boosterPlan;

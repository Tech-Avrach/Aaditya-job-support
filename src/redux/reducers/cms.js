import {
    RETRIEVE_CMS,
    CREATE_CMS,
    UPDATE_CMS,
    DELETE_CMS,
    RESTORE_CMS,
} from "../actions/types";

const initialState = { cms: [], totalCmsCount: 0 };

const cmsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case RETRIEVE_CMS:
            return {
                cms: payload.rows,
                totalCmsCount: payload.count,
            };
        case CREATE_CMS:
            return {
                ...state,
                cms: [...state.cms, payload],
                totalCmsCount: state.cms.length + 1,
            };
        case UPDATE_CMS:
            return {
                ...state,
                cms: state.cms.map((item) =>
                    item.publicId === action.payload?.publicId
                        ? action.payload
                        : item
                ),
            };
        case DELETE_CMS:
            // const remainData = state.cms.map((item) =>
            //     item.id === payload.id ? payload : item
            // );
            return {
                cms: state.cms.map((item) =>
                    item.publicId === action.payload?.publicId
                        ? action.payload
                        : item
                ),
                // totalCmsCount: payload.count,
            };
        case RESTORE_CMS:
            return {
                cms: state.cms.map((item) =>
                    item.publicId === action.payload?.publicId
                        ? action.payload
                        : item
                ),
                // totalCmsCount: payload.count,
            };
        default:
            return state;
    }
}

export default cmsReducer


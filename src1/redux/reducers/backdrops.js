import {
  SHOW_IMAGE_BACKDROP,
  CLOSE_IMAGE_BACKDROP,
} from "../actions/types";

const initialState = {
  imageBackdropStatus: false,
  selectedImage: null,
};

const backdropsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_IMAGE_BACKDROP:
      return {
        ...state,
        imageBackdropStatus: true,
        selectedImage: action.payload,
      };

    case CLOSE_IMAGE_BACKDROP:
      return {
        ...state,
        imageBackdropStatus: false,
        selectedImage: null,
      };

    default:
      return state;
  }
};

export default backdropsReducer;

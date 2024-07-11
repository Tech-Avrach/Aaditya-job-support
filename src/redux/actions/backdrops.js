import {
  SHOW_IMAGE_BACKDROP,
  CLOSE_IMAGE_BACKDROP,
} from "./types";

export const showImageBackdrop = (selectedImage) => (dispatch) => {
  dispatch({
    type: SHOW_IMAGE_BACKDROP,
    payload: selectedImage,
  });
};

export const closeImageBackdrop = () => (dispatch) => {
  dispatch({
    type: CLOSE_IMAGE_BACKDROP,
  });
};

import React from "react";
import styles from "./styles.module.scss";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { closeImageBackdrop } from "../../../redux/actions/backdrops";

export default function ImageBackdrop() {
  const dispatch = useDispatch();
  const { imageBackdropStatus, selectedImage } = useSelector(
    (state) => state.backdrops
  );

  const handleCloseBackdropImage = () => {
    dispatch(closeImageBackdrop());
  };

  return (
    <>
      {imageBackdropStatus && (
        <div className={styles.popup} onClick={handleCloseBackdropImage}>
          <ImCross onClick={handleCloseBackdropImage} />
          <img
            src={`${process.env.REACT_APP_SPACES_IMAGE_URL}${selectedImage}`}
            alt=""
          />
        </div>
      )}
    </>
  );
}

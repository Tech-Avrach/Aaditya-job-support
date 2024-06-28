import React, { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import styles from "../../assets/preview.module.scss";
import { createBanner } from "../../redux/actions/banner";

toast.configure();

const CreateBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [bannerName, setBannerName] = useState("");
  const [bannerUrl, setBannerUrl] = useState(null);
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState("");
  const [bannerNameErr, setBannerNameErr] = useState("");
  const [bannerUrlErr, setBannerUrlErr] = useState("");

  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();
    const inputFieldName = event.target.name;

    if (inputFieldName === "bannerName") {
      if (inputValue.length < 1) {
        setBannerNameErr("Banner name is required!");
      } else {
        setBannerNameErr("");
      }
    }
  };

  const updateHandler = (event) => {
    event.preventDefault();

    let errorCount = 0;
    if (bannerName === "" || bannerName === null || bannerName.length < 1) {
      setBannerNameErr("Banner name is required!");
      errorCount++;
    }

    if (bannerUrl === null) {
      setBannerUrlErr("Banner image is required!");
      errorCount++;
    }

    if (errorCount > 0) {
      return;
    } else {
      const formData = new FormData();
      formData.append("bannerName", bannerName);
      formData.append("banner", bannerUrl);

      dispatch(createBanner(formData))
        .then((response) => {
          toast("Banner Created successfully!", {
            transition: Slide,
            closeButton: true,
            autoClose: 3000,
            position: "top-right",
            type: "success",
          });
          navigate("/faq/list");
        })
        .catch((error) => {
          toast(error?.response?.data.message, {
            transition: Slide,
            closeButton: true,
            autoClose: 3000,
            position: "top-right",
            type: "error",
          });
        });
    }
  };

  const handleFileChange = (event) => {
    setBannerUrlErr("");

    const file = event.target.files[0];

    if (file) {
      const fileSize = file.size / 1024;

      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        setBannerUrlErr("Only images are allowed!");
        return;
      }

      if (fileSize > 1024) {
        setBannerUrlErr("Please upload a file of size less than 1MB!");
        return;
      }

      setBannerUrl(file);
      setBannerPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setBannerUrl(null);
    setBannerPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardHeader className="card-header-sm">
              <div className="card-header-title font-size-lg text-capitalize fw-normal">
                Add a Banner
              </div>
            </CardHeader>
            <Form>
              <CardBody>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="bannerName">Banner Name</Label>
                      <Input
                        invalid={bannerNameErr !== "" ? true : false}
                        type="text"
                        name="bannerName"
                        id="bannerName"
                        onChange={(e) => setBannerName(e.target.value)}
                        placeholder="Banner Name..."
                        value={bannerName ? bannerName : ""}
                        onKeyUp={handleValidation}
                      />
                      {bannerNameErr !== "" && <FormFeedback>{bannerNameErr}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="bannerUrl">Game Image</Label>
                      <Input
                        type="file"
                        name="bannerUrl"
                        id="bannerUrl"
                        accept="image/*"
                        onChange={handleFileChange}
                        innerRef={fileInputRef}
                      />
                      {bannerPreviewUrl && (
                        <div
                          className={styles.previewContainer}
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            width={100}
                            src={bannerPreviewUrl}
                            alt="preview"
                            onError={() =>
                                `${process.env.REACT_APP_PROFILE_IMAGE_URL}` +
                                  `user.png`
                            }
                          />
                          <a
                            href="#"
                            className={styles.deleteIcon}
                            onClick={handleDelete}
                            style={{
                              position: "absolute",
                            }}
                          >
                            <i className="pe-7s-trash"></i>
                          </a>
                        </div>
                      )}
                      {bannerUrlErr !== "" && (
                        <FormFeedback>{bannerUrlErr}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="d-block">
                <Button
                  className="me-2"
                  color="link"
                >
                  Cancel
                </Button>
                <Button size="lg" color="primary" onClick={updateHandler}>
                  Add Banner
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateBanner;

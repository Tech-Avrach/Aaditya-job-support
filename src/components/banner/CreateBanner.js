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

import { createBanner } from "../../redux/actions/banner";
import { useNavigate } from 'react-router-dom';
import styles from "../../assets/preview.module.scss";
import { categories, currencies, platforms, regions } from "../Games/data";
import bannerService from '../../redux/services/banner.service';

toast.configure();

const CreateBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [bannerName, setBannerName] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [bannerUrl, setBannerUrl] = useState(null);
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState("");
  const [bannerNameErr, setBannerNameErr] = useState("");
  const [curentCurrencyErr, setCurrentCurrencyErr]= useState("")
  
  const [discountedPriceErr, setDiscountedPriceErr] = useState("");
  const [originalPriceErr, setOriginalPriceErr] = useState("");
  const [bannerUrlErr, setBannerUrlErr] = useState("");
  const [curentCurrency, setCurrentCurrency]= useState("")
  const [gameImgPreview, setGameImgPreview]= useState("")
  const [gameRemovegmaeImg,setRemoveGameImg] = useState("")
  // const []

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
    if(inputFieldName ==="originalPrice"){
      if (inputValue.length < 1) {
        setOriginalPriceErr("Original Price is required!");
      } else {
        setOriginalPriceErr("");
      }

    }
    if(inputFieldName ==="currency"){
      if (inputValue.length < 1) {
        setCurrentCurrencyErr("Currency is required!");
      } else {
        setCurrentCurrencyErr("");
      }

    }
    if(inputFieldName ==="discountedPrice"){
      if (inputValue.length < 1) {
        setDiscountedPriceErr("Discounted Price is required!");
      } else {
        setDiscountedPriceErr("");
      }
      
    }
   
  };
// console.log(bannerPreviewUrl, "58");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(value);

    setCurrentCurrency({ ...curentCurrency, [name]: value });
  };

  const updateHandler = (event) => {
    event.preventDefault();
  
    let errorCount = 0;
    if (bannerName === "" || bannerName === null || bannerName.length < 1) {
      setBannerNameErr("Banner name is required!");
      errorCount++;
    }
    if (discountedPrice === "" || discountedPrice === null || discountedPrice.length < 1) {
      setDiscountedPriceErr("Discounted Price  is required!");
      errorCount++;
    }
    if (originalPrice === "" || originalPrice === null || originalPrice.length < 1) {
      setOriginalPriceErr("Original Price  is required!");
      errorCount++;
    }
    if (curentCurrency === "" || curentCurrency === null || curentCurrency.length < 1) {
      setCurrentCurrencyErr("Curency is required!");
      errorCount++;
    }
    // console.log(bannerUrl);
    if (bannerPreviewUrl === null) {
      setBannerUrlErr("Banner image is required!");
      errorCount++;
    }
    if (errorCount > 0) {

      return;
    } else {
      const data= {
        bannerName,
        bannerUrl: bannerPreviewUrl,
        discountedPrice,
        originalPrice,
        currency:curentCurrency.currency
      }
  //     // const formData = new FormData();
  //     // formData.append("bannerName", bannerName);
  //     // formData.append("bannerUrl", bannerPreviewUrl);
  //     // formData.append("originalPrice", originalPrice)
  //     // formData.append("discountedPrice", discountedPrice)
  //     // formData.append("currency", curentCurrency.currency)
  // console.log(curentCurrency);
      // For debugging purposes
      dispatch(createBanner(data))
        .then((response) => {
          toast("Banner Created successfully!", {
            transition: Slide,
            closeButton: true,
            autoClose: 3000,
            position: "top-right",
            type: "success", // info/success/warning/error
          });
          navigate("/banner/list");
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
  

  // const handleFileChange = (event) => {
  //   setBannerUrlErr("");

  //   const file = event.target.files[0];
  //   if (file) {
  //     const fileSize = file.size / 1024;

  //     if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
  //       setBannerUrlErr("Only images are allowed!");
  //       return;
  //     }

  //     if (fileSize > 1024) {
  //       setBannerUrlErr("Please upload a file of size less than 1MB!");
  //       return;
  //     }

  //     setBannerUrl(file);
  //     setBannerPreviewUrl(URL.createObjectURL(file));
  //   }
  // };

  const handleFileInput = (event) => {
    setBannerUrlErr("");

    let fileSize = 0;

    let errorCount = 0;

    const file = event.target.files[0];

    if (file) {
      fileSize = file.size / 1024;

      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        setBannerUrlErr("Only Images are allowed! ");

        errorCount++;
      }

      //check if filesize is not more than 1MB
      if (fileSize > 1024) {
        setBannerUrlErr("Please upload a file of size less than 1MB!");

        errorCount++;
      }

      if (errorCount === 0) {
        const imageAsBase64 = URL.createObjectURL(file);

        setBannerUrl(file);

        setGameImgPreview();

        const formData = new FormData();

        formData.append("banner", file);

        bannerService
          .uploadadImage(formData)
          .then((response) => {
            console.log("game", response.data.bannerUrl)
            // setCurrentGame({ ...currentGame, adImage: response.data.imageUrl });
            setBannerPreviewUrl(response.data.bannerUrl);
            setBannerUrlErr("")

          })
          .catch((error) => {
            toast(error.response.data.message, {
              transition: Slide,
              closeButton: true,
              autoClose: 3000,
              position: "top-right",
              type: "error",
            });
          });

        setRemoveGameImg(false);
      }
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
            <Form onSubmit={updateHandler}>
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
                        invalid={bannerUrlErr !== "" ? true : false}
                        type="file"
                        name="bannerUrl"
                        id="bannerUrl"
                        accept="image/*"
                        onChange={handleFileInput}
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
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="originalPrice">Original Price</Label>
                      <Input
                        invalid={originalPriceErr !== "" ? true : false}
                        type="number"
                        name="originalPrice"
                        id="originalPrice"
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="Original Price..."
                        value={originalPrice ? originalPrice : ""}
                        onKeyUp={handleValidation}
                      />
                      {originalPriceErr !== "" && <FormFeedback>{originalPriceErr}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="discountedPrice">Discounted Price</Label>
                      <Input
                       invalid={discountedPriceErr !== "" ? true : false}
                        type="number"
                        name="discountedPrice"
                        id="discountedPrice"
                        placeholder="Discounted Price..."
                        value={discountedPrice ? discountedPrice : ""}
                        onKeyUp={handleValidation}
                        onChange={(e) => setDiscountedPrice(e.target.value)}
                      />
                        {discountedPriceErr !== "" && <FormFeedback>{discountedPriceErr}</FormFeedback>}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                      <Label for="currency">Currency</Label>
                      <Input
                        invalid={curentCurrencyErr !== "" ? true : false}
                        type="select"
                        name="currency"
                        id="currency"
                        onKeyUp={handleValidation}
                        value={
                          curentCurrency?.currency != null
                            ? curentCurrency.currency
                            : ""
                        }
                        onChange={handleInputChange}
                      >
                        <option value=""> Select Currency </option>
                        {currencies &&
                          currencies.map((currency, index) => (
                            <option key={index} value={currency.code}>
                              {currency.name}
                            </option>
                          ))}
                      </Input>
                      {curentCurrencyErr !== "" && <FormFeedback>{curentCurrencyErr}</FormFeedback>}
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
                <Button size="lg" color="primary" type= "submit">
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

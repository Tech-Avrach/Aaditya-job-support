import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import users action
//import states action
import Loader from "react-loaders";
import { handleAccountApproval } from "../../redux/actions/sellers";

//Configure toastify
toast.configure();

const ProfileInformation = ({ sellerDetail, handleSellerDetails }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [currentSeller, setCurrentSeller] = useState(sellerDetail);

  //states for handling validations

  const [firstNameErr, setFirstNameErr] = useState("");

  const [emailErr, setEmailErr] = useState("");

  const [phoneNumberErr, setPhoneNumberErr] = useState("");

  useEffect(() => {
    if (sellerDetail !== undefined) {
      setCurrentSeller(sellerDetail); //set user details in the state when sellerDetail changes
    }
  }, [sellerDetail]);

  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentSeller({ ...currentSeller, [name]: value });
  };

  //validation handler
  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();

    const inputFieldName = event.target.name;

    //set error message for firstName
    if (inputFieldName === "firstName") {
      if (inputValue.length < 3) {
        setFirstNameErr("Please enter atleast 3 characters!");
      } else {
        setFirstNameErr("");
      }
    }

    //set error message for email
    if (inputFieldName === "email") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!emailRegex.test(inputValue) || inputValue.length === 0) {
        setEmailErr("Please enter a valid email address!");
      } else {
        setEmailErr("");
      }
    }

    //set error message for phoneNumber
    if (inputFieldName === "phoneNumber") {
      const emphoneNumberRegex = /^\d{10}$/;

      if (inputValue.length !== 0 && !emphoneNumberRegex.test(inputValue)) {
        setPhoneNumberErr("Please enter a 10 digit phone number!");
      } else {
        setPhoneNumberErr("");
      }
    }
  };


  const updateAccount = (event) => {
    event.preventDefault();
    let status = currentSeller.isActive ? 0 : 1;
    let data = {
      isActive: status,
    };
    let message = "";
    if (status === 0) {
      message = "Account deactivated successfully!";
    } else if (status === 1) {
      message = "Account activated successfully!";
    }
    dispatch(handleAccountApproval(id, data))
      .then((response) => {
        handleSellerDetails(response?.sellerInfo);
        toast(message, {
          transition: Slide,
          closeButton: true,
          autoClose: 3000,
          position: "top-right",
          type: "success", // info/success/warning/error
        });
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
  };

  return (
    <>
      {currentSeller && currentSeller.user ? (
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-sm">
                <div className="card-header-title font-size-lg text-capitalize fw-normal">
                  Seller Information
                </div>
              </CardHeader>
              <Form>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input
                          readOnly
                          invalid={firstNameErr !== "" ? true : false}
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name here..."
                          value={
                            currentSeller?.user?.firstName
                              ? currentSeller?.user?.firstName
                              : ""
                          }
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                        />
                        {firstNameErr !== "" && (
                          <FormFeedback>{firstNameErr}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="lastName">Last Name</Label>
                        <Input
                          readOnly
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name here..."
                          value={
                            currentSeller.user.lastName
                              ? currentSeller.user.lastName
                              : ""
                          }
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          invalid={emailErr !== "" ? true : false}
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email address here..."
                          value={
                            currentSeller.user.email
                              ? currentSeller.user.email
                              : ""
                          }
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                          readOnly={true}
                        />
                        {emailErr !== "" && (
                          <FormFeedback>{emailErr}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label>Phone Number</Label>
                        <Input
                          invalid={phoneNumberErr !== "" ? true : false}
                          type="text"
                          name="phoneNumber"
                          id="phoneNumber"
                          placeholder="Phone Number here..."
                          value={
                            currentSeller.contactNumber
                              ? currentSeller.contactNumber
                              : ""
                          }
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                          readOnly={true}
                        />
                        {phoneNumberErr !== "" && (
                          <FormFeedback>{phoneNumberErr}</FormFeedback>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* == */}

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="companyName">Company Name</Label>
                        <Input
                          readOnly
                          type="text"
                          name="companyName"
                          id="companyName"
                          placeholder="Company Name here..."
                          value={
                            currentSeller?.user.companyName
                              ? currentSeller?.user.companyName
                              : ""
                          }
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="companyNumber">Company Number </Label>
                        <Input
                          readOnly
                          type="text"
                          name="companyNumber"
                          id="companyNumber"
                          placeholder="Company Number here..."
                          value={
                            currentSeller?.user?.companyNumber
                              ? currentSeller?.user?.companyNumber
                              : ""
                          }
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="companyAddress">Company Address</Label>
                        <Input
                          readOnly
                          type="text"
                          name="companyAddress"
                          id="companyAddress"
                          placeholder="Company here..."
                          value={
                            currentSeller?.user?.companyAddress
                              ? currentSeller?.user?.companyAddress
                              : ""
                          }
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="d-block">
                  <Button
                    className="me-2"
                    color="link"
                    onClick={() => {
                      navigate(`/seller/list`);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="lg"
                    color={currentSeller.isActive ? "danger" : "primary"}
                    // id, status
                    // onClick={(e) =>
                    //   currentSeller.isActive
                    //     ? updateAccount(e, id, "0")
                    //     : updateAccount(e, id, "1")
                    // }
                    onClick={updateAccount}
                  >
                    {currentSeller.isActive ? "Disapprove" : "Approve"}
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <div
                className="loader-container"
                style={{ width: "75vw", height: "75vh" }}
              >
                <div className="loader-container-inner">
                  <div className="text-center">
                    <Loader type="ball-pulse-rise" />
                  </div>
                  <h6 className="mt-5">Please wait...</h6>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfileInformation;

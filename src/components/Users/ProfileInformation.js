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
import { updateUser, retrieveSingleUser } from "../../redux/actions/users";
//import states action

//Configure toastify
toast.configure();

const ProfileInformation = (props) => {
  const { id } = useParams();
  const userDetail = props.userDetail;

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(userDetail);

  //states for handling validations

  const [firstNameErr, setFirstNameErr] = useState("");

  const [emailErr, setEmailErr] = useState("");

  const [phoneNumberErr, setPhoneNumberErr] = useState("");

  const handleSetFormValues = () => {
    if (userDetail !== undefined) {
      setCurrentUser(userDetail);
    }
  };

  useEffect(() => {
    if (userDetail !== undefined) {
      setCurrentUser(userDetail); //set user details in the state when userDetail changes
    }
  }, [userDetail]);

  useEffect(() => {
    setTimeout(() => {
      handleSetFormValues();
    }, [1000]);
  }, [Object.keys(userDetail)?.length]);

  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
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

  //update form handler
  const updateHandler = (event) => {
    event.preventDefault();

    let errorCount = 0;

    const formData = new FormData();

    if (
      currentUser.firstName === "" ||
      currentUser.firstName === null ||
      currentUser.firstName < 3
    ) {
      setFirstNameErr("Please enter atleast 3 characters!");

      errorCount++;
    } else {
      formData.append("firstName", currentUser.firstName);

      setFirstNameErr("");
    }

    if (currentUser.lastName !== null && currentUser.lastName !== undefined) {
      formData.append("lastName", currentUser.lastName);
    }

    if (currentUser.email === "" || currentUser.email === null) {
      setEmailErr("Please enter a valid email address!");

      errorCount++;
    } else {
      formData.append("email", currentUser.email);

      setEmailErr("");
    }

    if (
      currentUser.contactNumber !== "" &&
      currentUser.contactNumber !== null &&
      currentUser.contactNumber !== undefined
    ) {
      formData.append("contactNumber", currentUser.contactNumber);
    }

    if (
      currentUser.companyName !== null &&
      currentUser.companyName !== undefined
    ) {
      formData.append("companyName", currentUser.companyName);
    }

    if (
      currentUser.companyNumber !== "" &&
      currentUser.companyNumber !== null &&
      currentUser.companyNumber !== undefined
    ) {
      formData.append("companyNumber", currentUser.companyNumber);
    }

    if (
      currentUser.companyAddress !== null &&
      currentUser.companyAddress !== undefined
    ) {
      formData.append("companyAddress", currentUser.companyAddress);
    }

    if (errorCount > 0) {
      return;
    } else {
      //dispatch to update the user
      dispatch(updateUser(currentUser.publicId, formData))
        .then((response) => {
          setCurrentUser({ ...currentUser });
          navigate('/user/list')

          toast("User updated successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
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
    }
  };

  useEffect(() => {
    dispatch(retrieveSingleUser(id))
      .then((response) => {
        setCurrentUser({ ...currentUser });
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
  }, [id]);

  return (
    <>
      {currentUser ? (
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-sm">
                <div className="card-header-title font-size-lg text-capitalize fw-normal">
                  Profile Information
                </div>
              </CardHeader>
              <Form>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="firstName">First Name</Label>
                        <Input
                          invalid={firstNameErr !== "" ? true : false}
                          type="text"
                          name="firstName"
                          id="firstName"
                          placeholder="First Name here..."
                          value={
                            currentUser.firstName ? currentUser.firstName : ""
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
                          type="text"
                          name="lastName"
                          id="lastName"
                          placeholder="Last Name here..."
                          value={
                            currentUser.lastName ? currentUser.lastName : ""
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
                          value={currentUser.email ? currentUser.email : ""}
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
                            currentUser.contactNumber
                              ? currentUser.contactNumber
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
                          type="text"
                          name="companyName"
                          id="companyName"
                          placeholder="Address here..."
                          value={
                            currentUser.companyName
                              ? currentUser.companyName
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
                          type="text"
                          name="companyNumber"
                          id="companyNumber"
                          placeholder="Address 2 here..."
                          value={
                            currentUser.companyNumber
                              ? currentUser.companyNumber
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
                          type="text"
                          name="companyAddress"
                          id="companyAddress"
                          placeholder="Address here..."
                          value={
                            currentUser.companyAddress
                              ? currentUser.companyAddress
                              : ""
                          }
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {/* <Row>
                    <FormGroup>
                      <Label for="profileImage">Profile Image</Label>
                      <Input
                        invalid={profileImgErr !== "" ? true : false}
                        type="file"
                        name="profileImage"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleFileInput}
                      />
                      {profileImgPreview && (
                        <div className={styles.previewContainer}>
                          <img
                            width={100}
                            src={profileImgPreview}
                            alt="preview"
                            onError={() => setProfileImgPreview(`${process.env.REACT_APP_PROFILE_IMAGE_URL}` + `user.png`)}
                          />
                          <a href="#" className={styles.deleteIcon} onClick={removeProfilePicture}>
                            <i className="pe-7s-trash"></i>
                          </a>
                        </div>
                      )}
                      {profileImgErr !== "" && (
                        <FormFeedback>{profileImgErr}</FormFeedback>
                      )}
                    </FormGroup>
                  </Row> */}
                </CardBody>
                <CardFooter className="d-block">
                  <Button
                    className="me-2"
                    color="link"
                    onClick={() => {
                      navigate(`/user/list`);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size="lg" color="primary" onClick={updateHandler}>
                    Update
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
              <p>You are not authorized to access the page!</p>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProfileInformation;

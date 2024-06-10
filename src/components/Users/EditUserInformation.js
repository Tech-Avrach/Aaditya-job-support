import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  CardBody,
  CardFooter,
} from "reactstrap";
import styles from "../../assets/preview.module.scss";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import users action
import { updateUser, retrieveSingleUser } from "../../redux/actions/users";

//import states action
// import { retrieveStates } from "../../redux/actions/states";

//Configure toastify
toast.configure();

const EditUserInformation = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentUser = props.currentUser;
  const id = currentUser?.publicId;

  const [currentUserInfo, setcurrentUserInfo] = useState({});
  //states for handling validations
  const [selectedProfileImg, setSelectedProfileImg] = useState(null);

  const [profileImgPreview, setProfileImgPreview] = useState("");

  const [removeProfileImg, setRemoveProfileImg] = useState(false);

  const [passwordErr, setPasswordErr] = useState("");

  const [cnfPasswordErr, setCnfPasswordErr] = useState("");

  const [firstNameErr, setFirstNameErr] = useState("");

  const [emailErr, setEmailErr] = useState("");

  const [contactNumberErr, setcontactNumberErr] = useState("");

  const [companyNumberErr, setCompanyNumberErr] = useState("");

  const [profileImgErr, setProfileImgErr] = useState("");

  useEffect(() => {
    console.log(id)
    dispatch(retrieveSingleUser(id))
        .then((response) => {
            setcurrentUserInfo(response)
        })
        .catch((err) => {
            console.log(err)
        })
  }, [dispatch]);

  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setcurrentUserInfo({ ...currentUserInfo, [name]: value });
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
    if (inputFieldName === "contactNumber") {
      const emphoneNumberRegex = /^\d{10}$/;

      if (inputValue.length !== 0 && !emphoneNumberRegex.test(inputValue)) {
        setcontactNumberErr("Please enter a 10 digit phone number!");
      } else {
        setcontactNumberErr("");
      }
    }

    //set error message for phoneNumber
    if (inputFieldName === "companyNumber") {
      const phoneNumberRegex = /^\d{10}$/;

      if (!phoneNumberRegex.test(inputValue) || inputValue.length !== 10) {
        setCompanyNumberErr("Please enter a 10 digit phone number!");
      } else {
        setCompanyNumberErr("");
      }
    }

    //set error message for password
    if (inputFieldName === "newPassword" && inputValue !== "") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;

      const lowercaseRegExp = /(?=.*?[a-z])/;

      const digitsRegExp = /(?=.*?[0-9])/;

      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;

      const minLengthRegExp = /.{8,}/;

      const uppercasePassword = uppercaseRegExp.test(inputValue);

      const lowercasePassword = lowercaseRegExp.test(inputValue);

      const digitsPassword = digitsRegExp.test(inputValue);

      const specialCharPassword = specialCharRegExp.test(inputValue);

      const minLengthPassword = minLengthRegExp.test(inputValue);

      let errMsg = "";

      if (!uppercasePassword) {
        errMsg = "Password must contain atleast one uppercase!";
      } else if (!lowercasePassword) {
        errMsg = "Password must contain atleast one lowercase";
      } else if (!digitsPassword) {
        errMsg = "Password must contain atleast one digit";
      } else if (!specialCharPassword) {
        errMsg = "Password must contain atleast one Special Characters";
      } else if (!minLengthPassword) {
        errMsg = "Password must contain minumum 8 characters";
      } else {
        errMsg = "";
      }

      setPasswordErr(errMsg);

      if (inputValue !== currentUserInfo.confirmPassword) {
        setCnfPasswordErr("Confirm password doesn't match");
      } else {
        setCnfPasswordErr("");
      }
    }

    //set error message for confirm password
    if (inputFieldName === "confirmPassword") {
      if (inputValue !== currentUserInfo.newPassword) {
        setCnfPasswordErr("Confirm password doesn't match");
      } else {
        setCnfPasswordErr("");
      }
    }
  };

  //file input handler
  const handleFileInput = (event) => {
    setProfileImgErr("");

    let fileSize = 0;

    let errorCount = 0;

    const file = event.target.files[0];

    if (file) {
      fileSize = file.size / 1024;

      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
        setProfileImgErr("Only Images are allowed! ");

        errorCount++;
      }

      //check if filesize is not more than 1MB
      if (fileSize > 1024) {
        setProfileImgErr("Please upload a file of size less than 1MB!");

        errorCount++;
      }

      if (errorCount === 0) {
        const imageAsBase64 = URL.createObjectURL(file);

        setSelectedProfileImg(file);

        setProfileImgPreview(imageAsBase64);

        setRemoveProfileImg(false);
      }
    }
  };

  const removeProfilePicture = (event) => {
    event.preventDefault();

    setProfileImgPreview("");

    setSelectedProfileImg(null);

    setRemoveProfileImg(true);
  };

  //update form handler
  const updateHandler = (event) => {
    event.preventDefault();
    let errorCount = 0;

    const formData = new FormData();

    if (
      currentUserInfo.firstName === "" ||
      currentUserInfo.firstName === null ||
      currentUserInfo.firstName < 3
    ) {
      setFirstNameErr("Please enter atleast 3 characters!");

      errorCount++;
    } else {
      formData.append("firstName", currentUserInfo.firstName);

      setFirstNameErr("");
    }

    if (
      currentUserInfo.lastName !== null &&
      currentUserInfo.lastName !== undefined
    ) {
      formData.append("lastName", currentUserInfo.lastName);
    }

    if (currentUserInfo.email === "" || currentUserInfo.email === null) {
      setEmailErr("Please enter a valid email address!");

      errorCount++;
    } else {
      formData.append("email", currentUserInfo.email);

      setEmailErr("");
    }

    if (
      currentUserInfo.contactNumber !== "" &&
      currentUserInfo.contactNumber !== null &&
      currentUserInfo.contactNumber !== undefined
    ) {
      formData.append("contactNumber", currentUserInfo.contactNumber);
    }

    if (
      currentUserInfo.username !== null &&
      currentUserInfo.username !== undefined
    ) {
      formData.append("username", currentUserInfo.username);
    }

    if (
      currentUserInfo.companyName !== "" &&
      currentUserInfo.companyName !== null &&
      currentUserInfo.companyName !== undefined
    ) {
      formData.append("companyName", currentUserInfo.companyName);
    }

    if (
      currentUserInfo.countryCode !== "" &&
      currentUserInfo.countryCode !== null
    ) {
      formData.append("countryCode", currentUserInfo.countryCode);
    }

    if (
      currentUserInfo.companyNumber !== "" &&
      currentUserInfo.companyNumber !== null &&
      currentUserInfo.companyNumber !== undefined
    ) {
      formData.append("companyNumber", currentUserInfo.companyNumber);
    }

    if (
      currentUserInfo.positionInCompany !== null &&
      currentUserInfo.positionInCompany !== undefined
    ) {
      formData.append("positionInCompany", currentUserInfo.positionInCompany);
    }

    if (
      currentUserInfo.companyAddress !== null &&
      currentUserInfo.companyAddress !== undefined
    ) {
      formData.append("companyAddress", currentUserInfo.companyAddress);
    }

    if (
      currentUserInfo.businessType !== null &&
      currentUserInfo.businessType !== undefined
    ) {
      formData.append("businessType", currentUserInfo.businessType);
    }

    if (
      currentUserInfo.vatNumber !== null &&
      currentUserInfo.vatNumber !== undefined &&
      currentUserInfo.vatNumber !== ""
    ) {
      formData.append("isVatNumber", "1");
      formData.append("vatNumber", currentUserInfo.vatNumber);
    }
    // else {
    //   formData.append("isVatNumber", "0");
    // }

    if (profileImgErr !== "") {
      errorCount++;
    } else {
      if (selectedProfileImg !== null)
        formData.append("profileImage", selectedProfileImg);
    }

    if (removeProfileImg) {
      formData.append("removeProfileImage", removeProfileImg);
    }

    if (passwordErr !== "" || cnfPasswordErr !== "") {
      errorCount++;
    } else {
      if (
        currentUserInfo.newPassword !== "" &&
        currentUserInfo.newPassword !== undefined
      )
        formData.append("password", currentUserInfo.newPassword);
    }

    if (errorCount > 0) {
      return;
    } else {

        dispatch(updateUser(id, formData))
        .then((response) => {
            toast("User Added successfully!", {
              transition: Slide,
  
              closeButton: true,
  
              autoClose: 3000,
  
              position: "top-right",
  
              type: "success", // info/success/warning/error
            });
            setcurrentUserInfo({});
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

  const countries = [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States" },
    { code: "+1", name: "Canada" },
    { code: "+33", name: "France" },
    { code: "+49", name: "Germany" },
    { code: "+81", name: "Japan" },
  ];
  return (
    <>
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            {/* <CardHeader className="card-header-sm">
                    <div className="card-header-title font-size-lg text-capitalize fw-normal">
                      Profile Information
                    </div>
                  </CardHeader> */}
            <Form>
              <CardBody>
                {/* <CardTitle>Profile Information</CardTitle> */}
                {/* <div className="divider" /> */}
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
                          currentUserInfo.firstName
                            ? currentUserInfo.firstName
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
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last Name here..."
                        value={
                          currentUserInfo.lastName
                            ? currentUserInfo.lastName
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
                          currentUserInfo.email ? currentUserInfo.email : ""
                        }
                        onChange={handleInputChange}
                        onKeyUp={handleValidation}
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
                        invalid={contactNumberErr !== "" ? true : false}
                        type="text"
                        name="contactNumber"
                        id="contactNumber"
                        placeholder="Phone Number here..."
                        value={
                          currentUserInfo.contactNumber
                            ? currentUserInfo.contactNumber
                            : ""
                        }
                        onChange={handleInputChange}
                        onKeyUp={handleValidation}
                      />
                      {contactNumberErr !== "" && (
                        <FormFeedback>{contactNumberErr}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="username">User Name</Label>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="User Name here..."
                        value={
                          currentUserInfo.username
                            ? currentUserInfo.username
                            : ""
                        }
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="countryCode">Country Code</Label>
                      <Input
                        type="select"
                        name="countryCode"
                        id="countryCode"
                        value={
                          currentUserInfo.countryCode != null
                            ? currentUserInfo.countryCode
                            : ""
                        }
                        onChange={handleInputChange}
                      >
                        <option value=""> Select Country Code </option>
                        {countries &&
                          countries.map((country, index) => (
                            <option key={index} value={country.code}>
                              {country.name}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="companyName">Company Name</Label>
                      <Input
                        type="text"
                        name="companyName"
                        id="companyName"
                        placeholder="Company Name here..."
                        value={
                          currentUserInfo.companyName
                            ? currentUserInfo.companyName
                            : ""
                        }
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="companyNumber">Company Number</Label>
                      <Input
                        invalid={companyNumberErr !== "" ? true : false}
                        type="text"
                        name="companyNumber"
                        id="companyNumber"
                        placeholder="Company Number here..."
                        value={
                          currentUserInfo.companyNumber
                            ? currentUserInfo.companyNumber
                            : ""
                        }
                        onChange={handleInputChange}
                        onKeyUp={handleValidation}
                      />
                      {companyNumberErr !== "" && (
                        <FormFeedback>{companyNumberErr}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="positionInCompany">Position in Company</Label>
                      <Input
                        type="text"
                        name="positionInCompany"
                        id="positionInCompany"
                        placeholder="Position here..."
                        value={
                          currentUserInfo.positionInCompany
                            ? currentUserInfo.positionInCompany
                            : ""
                        }
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="companyAddress">Company Address</Label>
                      <Input
                        type="text"
                        name="companyAddress"
                        id="companyAddress"
                        placeholder="Company Address 2 here..."
                        value={
                          currentUserInfo.companyAddress
                            ? currentUserInfo.companyAddress
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
                      <Label for="businessType">Business Type</Label>
                      <Input
                        type="text"
                        name="businessType"
                        id="businessType"
                        placeholder="Business Type here..."
                        value={
                          currentUserInfo.businessType
                            ? currentUserInfo.businessType
                            : ""
                        }
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="vatNumber">Vat Number</Label>
                      <Input
                        type="text"
                        name="vatNumber"
                        id="vatNumber"
                        placeholder="Vat Number here..."
                        value={
                          currentUserInfo.vatNumber
                            ? currentUserInfo.vatNumber
                            : ""
                        }
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label for="stateCode">State</Label>
                        <Input
                          readOnly = { role !== "admin" ? true : false }
                          type="select"
                          name="stateCode"
                          id="stateCode"
                          value={ currentUserInfo.stateCode != null ? currentUserInfo.stateCode : ''}
                          onChange={handleInputChange}
                        >
                          <option value=""> Select State </option>
                          {states &&
                            states.map((state, index) => (
                              <option key={index} value={state.code}>
                                {state.name}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="city">City</Label>
                        <Input
                          readOnly = { role !== "admin" ? true : false }
                          type="text"
                          name="city"
                          id="city"
                          value={ currentUserInfo.city != null ? currentUserInfo.city : ''}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label for="zipCode">Zip Code</Label>
                        <Input
                          readOnly = { role !== "admin" ? true : false }
                          type="text"
                          name="zipCode"
                          id="zipCode"
                          placeholder="Zip Code here..."
                          value={currentUserInfo.zipCode ? currentUserInfo.zipCode : ""}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}

                <Row>
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
                          onError={() =>
                            setProfileImgPreview(
                              `${process.env.REACT_APP_PROFILE_IMAGE_URL}` +
                                `user.png`
                            )
                          }
                        />
                        <a
                          href="#"
                          className={styles.deleteIcon}
                          onClick={removeProfilePicture}
                        >
                          <i className="pe-7s-trash"></i>
                        </a>
                      </div>
                    )}
                    {profileImgErr !== "" && (
                      <FormFeedback>{profileImgErr}</FormFeedback>
                    )}
                  </FormGroup>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="newPassword">Password</Label>
                      <Input
                        invalid={passwordErr !== "" ? true : false}
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        placeholder="New Password here..."
                        onKeyUp={handleValidation}
                        onChange={handleInputChange}
                      />
                      {passwordErr !== "" && (
                        <FormFeedback>{passwordErr}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="confirmPassword">Confirm Password</Label>
                      <Input
                        // readOnly = { role !== "admin" ? true : false }
                        invalid={cnfPasswordErr !== "" ? true : false}
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Confirm Password here..."
                        onKeyUp={handleValidation}
                        onChange={handleInputChange}
                      />
                      {cnfPasswordErr !== "" && (
                        <FormFeedback>{cnfPasswordErr}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="d-block">
                <Button
                  className="me-2"
                  color="link"
                  onClick={() => {
                    navigate(`/dashboard`);
                  }}
                >
                  Cancel
                </Button>
                <Button size="lg" color="primary" onClick={updateHandler}>
                  Edit User
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditUserInformation;

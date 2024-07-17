
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
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
import { AddUserSuperAdmin, updateUser } from "../../redux/actions/users";
import { regions } from "../Games/data";
import ModuleIdMap from "../Common/ModuleIdMap";
import { retrieveRole } from "../../redux/actions/roles";
//import states action
// import { retrieveStates } from "../../redux/actions/states";

//Configure toastify
toast.configure();

const ProfileInformation = ({ user }) => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { role } = useSelector(state => state.role);

  const [currentUser, setCurrentUser] = useState({});
  //states for handling validations
  const [selectedProfileImg, setSelectedProfileImg] = useState(null);

  const [profileImgPreview, setProfileImgPreview] = useState("");

  const [removeProfileImg, setRemoveProfileImg] = useState(false);

  const [passwordErr, setPasswordErr] = useState("");

  const [cnfPasswordErr, setCnfPasswordErr] = useState("");

  const [firstNameErr, setFirstNameErr] = useState("");

  const [emailErr, setEmailErr] = useState("");

  const [dobErr, setDobErr] = useState("");

  const [contactNumberErr, setcontactNumberErr] = useState("");

  const [companyNumberErr, setCompanyNumberErr] = useState("");

  const [profileImgErr, setProfileImgErr] = useState("");

  const [regionErr, setRegionErr] = useState("");

  const permissionMap = useSelector(state => state.auth.permissionMap)

  const permission = permissionMap[ModuleIdMap.user];

  const isSuperAdmin = user[0]?.roleId

  const filteredRole = role.filter(item => item.name !== 'Seller');



  // const permissison = {
  //   "create": element.create,
  //   "read": element.read,
  //   "update": element.update,
  //   "delete": element.delete,
  //   "restore": element.restore,
  //   "statusUpdate": element.statusUpdate
  // }


  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    
    setCurrentUser({ ...currentUser, [name]: value });
  };

  useEffect(() => {
    dispatch(retrieveRole());
  }, []);

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

      if (inputValue !== currentUser.confirmPassword) {
        setCnfPasswordErr("Confirm password doesn't match");
      } else {
        setCnfPasswordErr("");
      }
    }

    //set error message for confirm password
    if (inputFieldName === "confirmPassword") {
      if (inputValue !== currentUser.newPassword) {
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

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return '';

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());
    return `${month}/${day}/${year}`;
 
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
    if (currentUser.dateOfBirth === "" || currentUser.dateOfBirth === null) {
      setDobErr("Please enter a valid date!");

      errorCount++;
    } else {
      formData.append("dateOfBirth", formatDateString(currentUser.dateOfBirth));

      setDobErr("");
    }

    if (
      currentUser.contactNumber !== "" &&
      currentUser.contactNumber !== null &&
      currentUser.contactNumber !== undefined
    ) {
      formData.append("contactNumber", currentUser.contactNumber);
    }

    if (currentUser.username !== null && currentUser.username !== undefined) {
      formData.append("username", currentUser.username);
    }

    if (
      currentUser.companyName !== "" &&
      currentUser.companyName !== null &&
      currentUser.companyName !== undefined
    ) {
      formData.append("companyName", currentUser.companyName);
    }

    if (currentUser.countryCode !== "" && currentUser.countryCode !== null) {
      formData.append("countryCode", currentUser.countryCode);
    }

    // if (
    //   currentUser.companyNumber !== "" &&
    //   currentUser.companyNumber !== null &&
    //   currentUser.companyNumber !== undefined
    // ) {
    //   formData.append("companyNumber", currentUser.companyNumber);
    // }

    // if (
    //   currentUser.positionInCompany !== null &&
    //   currentUser.positionInCompany !== undefined
    // ) {
    //   formData.append("positionInCompany", currentUser.positionInCompany);
    // }

    // if (
    //   currentUser.companyAddress !== null &&
    //   currentUser.companyAddress !== undefined
    // ) {
    //   formData.append("companyAddress", currentUser.companyAddress);
    // }

    // if (
    //   currentUser.businessType !== null &&
    //   currentUser.businessType !== undefined
    // ) {
    //   formData.append("businessType", currentUser.businessType);
    // }

    // if (
    //   currentUser.vatNumber !== null &&
    //   currentUser.vatNumber !== undefined &&
    //   currentUser.vatNumber !== ""
    // ) {
    //   formData.append("isVatNumber", "1");
    //   formData.append("vatNumber", currentUser.vatNumber);
    // }
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
        currentUser.newPassword !== "" &&
        currentUser.newPassword !== undefined
      )
        formData.append("password", currentUser.newPassword);
    }

    if(currentUser.region !== null && currentUser.region !== undefined && currentUser.region !== "Select Region") {
      formData.append("region", currentUser.region);
    } else {
      errorCount++;
    }

    if(currentUser.roleId !== null && currentUser.roleId !== undefined && currentUser.roleId !== "Select Role") {
      formData.append("roleId", currentUser.roleId);
    } else {
      errorCount++;
    }

    // console.log(currentUser.region)

    if (errorCount > 0) {
      return;
    } else {
      //dispatch to update the user
      dispatch(AddUserSuperAdmin(formData))
        .then((response) => {
          setCurrentUser({ ...currentUser });
          toast("User Added successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
          setCurrentUser({});
          navigate("/user/list");
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
                        value={currentUser.lastName ? currentUser.lastName : ""}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="username">Username</Label>
                      <Input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="User Name here..."
                        value={currentUser.username ? currentUser.username : ""}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="username">Date of Birth</Label>
                      <Input
                        invalid={dobErr !== "" ? true : false}
                        type="date"
                        name="dateOfBirth"
                        id="dateOfBirth"
                        placeholder="Date of Birth here..."
                        value={currentUser.dateOfBirth ? currentUser.dateOfBirth : ""}
                        onChange={handleInputChange}
                      />
                      {dobErr !== "" && (
                        <FormFeedback>{dobErr}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
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
                      />
                      {emailErr !== "" && (
                        <FormFeedback>{emailErr}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="region">Region</Label>
                      <Input
                        type="select"
                        name="region"
                        id="region"
                        value={currentUser.region ? currentUser.region : ""}
                        onChange={handleInputChange}
                      >
                        <option value=""> Select Region </option>
                        {regions &&
                          regions.map((region, index) => (
                            <option key={index} value={region.code}>
                              {region.name}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                <Col md="6">
                    <FormGroup>
                      <Label for="countryCode">Country Code</Label>
                      <Input
                        type="select"
                        name="countryCode"
                        id="countryCode"
                        value={
                          currentUser.countryCode != null
                            ? currentUser.countryCode
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
                          currentUser.contactNumber
                            ? currentUser.contactNumber
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

                {/* <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="companyName">Company Name</Label>
                      <Input
                        type="text"
                        name="companyName"
                        id="companyName"
                        placeholder="Company Name here..."
                        value={
                          currentUser.companyName ? currentUser.companyName : ""
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
                          currentUser.companyNumber
                            ? currentUser.companyNumber
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
                          currentUser.positionInCompany
                            ? currentUser.positionInCompany
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
                          currentUser.companyAddress
                            ? currentUser.companyAddress
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
                          currentUser.businessType
                            ? currentUser.businessType
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
                          currentUser.vatNumber ? currentUser.vatNumber : ""
                        }
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}

                {/* <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label for="stateCode">State</Label>
                        <Input
                          readOnly = { role !== "admin" ? true : false }
                          type="select"
                          name="stateCode"
                          id="stateCode"
                          value={ currentUser.stateCode != null ? currentUser.stateCode : ''}
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
                          value={ currentUser.city != null ? currentUser.city : ''}
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
                          value={currentUser.zipCode ? currentUser.zipCode : ""}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row> */}

                {/* <Row>
                  
                </Row> */}
                <Row>
                  <Col md={isSuperAdmin ? "6" : "12"}>
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
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="countryCode">Role</Label>
                      <Input
                        type="select"
                        name="roleId"
                        id="roleId"
                        value={
                          currentUser.roleId != null
                            ? currentUser.roleId
                            : ""
                        }
                        onChange={handleInputChange}
                      >
                        <option value=""> Select Role </option>
                        {filteredRole &&
                          filteredRole.map((role, index) => (
                            <option key={index} value={role.name}>
                              {role.name}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
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
                    navigate(`/user/list`);
                  }}
                >
                  Cancel
                </Button>
                <Button size="lg" color="primary" onClick={updateHandler}>
                  Add User
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProfileInformation;

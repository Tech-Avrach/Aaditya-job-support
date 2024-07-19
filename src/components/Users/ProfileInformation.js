
import React, { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { countries } from "../Games/data";
import styles from "../../assets/preview.module.scss";
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
import { regions } from "../Games/data";
import { retrieveRole } from "../../redux/actions/roles";
//import states action

//Configure toastify
toast.configure();

const ProfileInformation = ({user}) => {
  const { id } = useParams();
  const userDetail = user;

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

  // const [firstNameErr, setFirstNameErr] = useState("");

  // const [emailErr, setEmailErr] = useState("");

  const [dobErr, setDobErr] = useState("");

  const [contactNumberErr, setcontactNumberErr] = useState("");

  const [companyNumberErr, setCompanyNumberErr] = useState("");

  const [profileImgErr, setProfileImgErr] = useState("");

  const [regionErr, setRegionErr] = useState("");


  const [firstNameErr, setFirstNameErr] = useState("");

  const [emailErr, setEmailErr] = useState("");

  const [phoneNumberErr, setPhoneNumberErr] = useState("");
  const isSuperAdmin = user[0]?.roleId

  const filteredRole = role.filter(item => item.name !== 'Seller');

  console.log(filteredRole)

  // const handleSetFormValues = () => {
  //   if (userDetail !== undefined) {
  //     setCurrentUser(userDetail);
  //   }
  // };

  // useEffect(() => {
  //   if (userDetail !== undefined) {
  //     setCurrentUser(userDetail); //set user details in the state when userDetail changes
  //   }
  // }, [userDetail]);


  useEffect(() => {
    dispatch(retrieveRole());
  }, []);
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleSetFormValues();
  //   }, [1000]);
  // }, [Object.keys(userDetail)?.length]);

  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
}

const formatDateString = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date)) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${month}/${day}/${year}`;

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

    console.log(currentUser)
    let errorCount = 0;

    const formData = new FormData();

    if (
      currentUser.firstName === "" ||
      currentUser.firstName === null ||
      currentUser.firstName < 3
    ) {
      setFirstNameErr("Please enter atleast 3 characters!");

      console.log("fname Error");
      errorCount++;
    } else {
      formData.append("firstName", currentUser.firstName);

      setFirstNameErr("");
    }

    if (
      currentUser.lastName === "" ||
      currentUser.lastName === null ||
      currentUser.lastName < 3
    ) {
      // setLastNameErr("Please enter atleast 3 characters!");

      console.log("lastname err")
      errorCount++;
    } else {
      formData.append("lastName", currentUser.lastName);

      // setLastNameErr("");
    }

    if (currentUser.email === "" || currentUser.email === null) {
      setEmailErr("Please enter a valid email address!");

      console.log("email err")
      errorCount++;
    } else {
      formData.append("email", currentUser.email);

      setEmailErr("");
    }
    if (currentUser.dateOfBirth === "" || currentUser.dateOfBirth === null) {
      setDobErr("Please enter a valid date!");

      console.log("date err")
      errorCount++;
    } else {

      console.log("Formatdate", formatDate(currentUser.dateOfBirth))
      console.log("formatDateString", formatDateString(currentUser.dateOfBirth))
      console.log("DATE", currentUser.dateOfBirth);

      
      formData.append("dateOfBirth", formatDate(currentUser.dateOfBirth));

      setDobErr("");
    }

    if (
      currentUser.contactNumber === "" ||
      currentUser.contactNumber === null ||
      currentUser.contactNumber === undefined
    ) {
      setcontactNumberErr("Please enter correct contact number!");

      console.log("contact err")
      errorCount++;
    } else {
      formData.append("contactNumber", currentUser.contactNumber);

      setcontactNumberErr("");
    }

    if (
      currentUser.username === "" ||
      currentUser.username === null ||
      currentUser.username === undefined
    ) {
      // setUserNameErr("Please enter user name!");

      console.log("username err")
      errorCount++;
    } else {
      formData.append("username", currentUser.username);

      // setUserNameErr("");
    }

    if(
      currentUser.countryCode === "" ||
      currentUser.countryCode === null ||
      currentUser.countryCode === undefined
    ) {
      // setCountryCodeErr("Please enter country code!");

      console.log("country code err")
      errorCount++;
    } else {
      formData.append("countryCode", currentUser.countryCode);

      // setCountryCodeErr("");
    }

    if(
      selectedProfileImg === null ||
      selectedProfileImg === undefined ||
      selectedProfileImg === ""
    ) {
      // setProfileImgErr("Please select profile image!");

      console.log("profile image err")
      errorCount++;
    } else {
      formData.append("profileImage", selectedProfileImg);

      // setProfileImgErr("");
    }

    // if (removeProfileImg) {
    //   formData.append("removeProfileImage", removeProfileImg);
    // }

    if (passwordErr === "" || cnfPasswordErr === "") {
      if (
        currentUser.newPassword === "" ||
        currentUser.newPassword === null ||
        currentUser.newPassword === undefined
      ) {
        // setPasswordErr("Please enter password!");
        // setCnfPasswordErr("Please enter confirm password!");

        console.log("password err")
        errorCount++;
      } else {
        formData.append("password", currentUser.newPassword);
      }
    }

    if (
      currentUser.country === null ||
      currentUser.country === undefined ||
      currentUser.country === "Select Country" ||
      currentUser.country === ""
    ) {
      // setCountryErr("Please select country!");
      console.log("country err")
      errorCount++;
    } else {
      formData.append("country", currentUser.country);

      // setCountryErr("");
    }

    if (
      currentUser.roleId === null ||
      currentUser.roleId === undefined ||
      currentUser.roleId === "Select Role" ||
      currentUser.roleId === ""
    ) {
      // setRoleErr("Please select role!");

      console.log("role err")
      errorCount++;
    } else {
      formData.append("roleId", currentUser.roleId);

      // setRoleErr("");
    }

    console.log(errorCount)
    if (errorCount > 0) {
      return;
    } else {
      dispatch(updateUser(id, formData))
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
        console.log(response)
        console.log(response.profileImage);
        setCurrentUser({
          firstName: response.firstName,
          lastName: response.lastName,
          email: response.email,
          dateOfBirth: response.dateOfBirth,
          contactNumber: response.contactNumber,
          profileImage: response.profileImage,
          roleId: response.roleId,
          username: response.username,
          newPassword: response.password,
          country: response.country,
          countryCode: response.countryCode,
        });
        setProfileImgPreview(response.profileImage)
        setSelectedProfileImg(response.profileImage);
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

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return date.toISOString().split('T')[0];
  };
  const countriesCode = [
    { code: 91, name: "India" },
    { code: 1, name: "United States" },
    { code: 1, name: "Canada" },
    { code: 33, name: "France" },
    { code: 49, name: "Germany" },
    { code: 81, name: "Japan" },
  ];
  return (
    <>
      {currentUser ? (
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
                      <Label for="firstName"> Name</Label>
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
                        value={currentUser.dateOfBirth ? formatDate(currentUser.dateOfBirth) : ""}
                        onChange={handleInputChange}
                      />
                      {console.log(currentUser.dateOfBirth )}
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
                      <Label for="country">Country</Label>
                      <Input
                        type="select"
                        name="country"
                        id="country"
                        value={currentUser.country ? currentUser.country : ""}
                        onChange={handleInputChange}
                      >
                        <option value=""> Select Country </option>
                        {countries &&
                          countries.map((countrie, index) => (
                            <option key={index} value={countrie}>
                              {countrie}
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
                            // ? countriesCode.find(e=>e.name===currentUser.country).code
                            ?currentUser.countryCode
                            : ""
                        }
                        onChange={handleInputChange}
                      >
                        <option value=""> Select Country Code </option>
                        {countriesCode &&
                          countriesCode.map((country, index) => (
                            <option key={index} value={country.code}>
                              +{country.code}
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
                            <option key={index} value={role.id}>
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
                  Update User
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
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

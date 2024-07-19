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
import styles from "../../assets/preview.module.scss";

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

  const [sellerDetails, setSellerDetails] = useState({
    nationalIdNumber: "",
    supportiveDoc: null,
    accountType: "",
    companyName: "",
    positionInCompany: "",
    companyNumber: "",
    vatNumber: "",
    companyAddress: "",
  });

  const [supportiveDocPreview, setSupportiveDocPreview] = useState("");


  //states for handling validations

  const [firstNameErr, setFirstNameErr] = useState("");

  const [emailErr, setEmailErr] = useState("");

  const [phoneNumberErr, setPhoneNumberErr] = useState("");


  useEffect(() => {
    if (sellerDetail !== undefined) {
      setCurrentSeller(sellerDetail);
      console.log('seller',sellerDetail) 
      setSellerDetails({
        nationalIdNumber: sellerDetail.nationalIdNumber,
        accountType: sellerDetail.accountType,
        companyName: sellerDetail.companyName,
        positionInCompany: sellerDetail.positionInCompany,
        companyNumber: sellerDetail.companyNumber,
        vatNumber: sellerDetail.vatNumber,
        companyAddress: sellerDetail.companyAddress,
        supportiveDoc: sellerDetail.supportiveDoc,
        setSupportiveDocPreview: sellerDetail.supportiveDoc
      });
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
        const sellers = response?.listSellers;
        const sellerForUpdate = sellers?.find(seller => seller.publicId === id);
        handleSellerDetails(sellerForUpdate);
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
        <Label for="nationalIdNumber">National ID Number</Label>
        <Input
          type="text"
          name="nationalIdNumber"
          id="nationalIdNumber"
          placeholder="Enter National ID Number"
          value={sellerDetails.nationalIdNumber}
          onChange={handleInputChange}
          disabled={true}
        />
      </FormGroup>
    </Col>
    <Col md="6">
      <FormGroup>
        <Label for="supportiveDoc">Supportive Document</Label>
        <Input
          type="file"
          name="supportiveDoc"
          id="supportiveDoc"
          // onChange={handleFileInput}
          disabled={true}
        />
        {supportiveDocPreview && (
          <div className={styles.previewContainer}>
            <img width={100} src={supportiveDocPreview} alt="preview" />
            {/* <a href="#" className={styles.deleteIcon} onClick={removeSupportDoc}>
              <i className="pe-7s-trash"></i>
            </a> */}
          </div>
        )}
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md="6">
      <FormGroup>
        <Label for="accountType">Account Type</Label>
        <Input
          type="text"
          name="accountType"
          id="accountType"
          placeholder="Enter Account Type"
          value={sellerDetails.accountType}
          onChange={handleInputChange}
          disabled={true}
        />
      </FormGroup>
    </Col>
    <Col md="6">
      <FormGroup>
        <Label for="companyName">Company Name</Label>
        <Input
          type="text"
          name="companyName"
          id="companyName"
          placeholder="Enter Company Name"
          value={sellerDetails.companyName}
          onChange={handleInputChange}
          disabled={true}
        />
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
          placeholder="Enter Position in Company"
          value={sellerDetails.positionInCompany}
          onChange={handleInputChange}
          disabled={true}
        />
      </FormGroup>
    </Col>
    <Col md="6">
      <FormGroup>
        <Label for="companyNumber">Company Number</Label>
        <Input
          type="text"
          name="companyNumber"
          id="companyNumber"
          placeholder="Enter Company Number"
          value={sellerDetails.companyNumber}
          onChange={handleInputChange}
          disabled={true}
        />
      </FormGroup>
    </Col>
  </Row>
  <Row>
    <Col md="6">
      <FormGroup>
        <Label for="vatNumber">VAT Number</Label>
        <Input
          type="text"
          name="vatNumber"
          id="vatNumber"
          placeholder="Enter VAT Number"
          value={sellerDetails.vatNumber}
          onChange={handleInputChange}
          disabled={true}
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
          placeholder="Enter Company Address"
          value={sellerDetails.companyAddress}
          onChange={handleInputChange}
          disabled={true}
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

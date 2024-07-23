import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
  FormFeedback,
} from "reactstrap";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageContainer from "../Layout/PageContainer";
import styles from "../../assets/preview.module.scss";
import { useDispatch } from "react-redux";
import sellerService from "../../redux/services/seller.service";
import { updateSeller } from "../../redux/actions/sellers";
toast.configure();

function EditSeller() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log("id", id);


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
  const [supportiveDocErr, setSupportiveDocErr] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const [errors, setErrors] = useState({
    nationalIdNumber: "",
    accountType: "",
    companyName: "",
    positionInCompany: "",
    companyNumber: "",
    vatNumber: "",
    companyAddress: "",
  });

  useEffect(() => {
    if (id) {
      sellerService.get(id).then((res) => {
        console.log(res);
        const sellerInfo = res?.data?.sellerInfo;
        if (sellerInfo) {
          console.log(sellerInfo.supportiveDoc);

          setSupportiveDocPreview(sellerInfo.supportiveDoc);
          setSellerDetails({
            nationalIdNumber: sellerInfo.nationalIdNumber,
            accountType: sellerInfo.accountType,
            companyName: sellerInfo.companyName,
            positionInCompany: sellerInfo.positionInCompany,
            companyNumber: sellerInfo.companyNumber,
            vatNumber: sellerInfo.vatNumber,
            companyAddress: sellerInfo.companyAddress,
            supportiveDoc: sellerInfo.supportiveDoc,
          });
        }
      });
    }
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSellerDetails({ ...sellerDetails, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileInput = (event) => {
    setSupportiveDocErr("");
    setButtonDisable(true);
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["image/jpeg", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setSupportiveDocErr("Only JPG and PDF files are allowed.");
        setButtonDisable(false);
        return;
      }
  
      const supportiveDoc = new FormData();
      supportiveDoc.append("supportiveDoc", file);
  
      sellerService.uploadDoc(supportiveDoc)
        .then((response) => {
          setSupportiveDocPreview(response.data.supportiveDocUrl);
          setSellerDetails({ ...sellerDetails, supportiveDoc: response.data.supportiveDocUrl });
          setSupportiveDocErr("");
          setButtonDisable(false);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
          setSupportiveDocErr("Error uploading file");
          setButtonDisable(false);
        });
    }
  };
  

  const removeSupportDoc = () => {
    setSellerDetails({ ...sellerDetails, supportiveDoc: null });
    setSupportiveDocPreview("");
  };

  const updateHandler = () => {
    let errorCount = 0;
    // const newErrors = { ...errors };

    // const formatLabel = (key) => {
    //   return key
    //     .replace(/([A-Z])/g, ' $1')
    //     .replace(/^./, (str) => str.toUpperCase());
    // };

    // Object.keys(sellerDetails).forEach((key) => {
    //   if (!sellerDetails[key] || sellerDetails[key] === "") {
    //     newErrors[key] = `${formatLabel(key)} is required`;
    //     errorCount++;
    //   }
    // });

    // if (!sellerDetails.supportiveDoc) {
    //   setSupportiveDocErr("Supportive Document is required");
    //   errorCount++;
    // }

    // setErrors(newErrors);

    if (errorCount === 0) {
      // Construct form data object
      // const formData = new FormData();

      // formData.append("nationalIdNumber", sellerDetails.nationalIdNumber);
      // formData.append("supportiveDoc", sellerDetails.supportiveDoc);
      // formData.append("accountType", sellerDetails.accountType);
      // formData.append("companyName", sellerDetails.companyName);
      // formData.append("positionInCompany", sellerDetails.positionInCompany);
      // formData.append("companyNumber", sellerDetails.companyNumber);
      // formData.append("vatNumber", sellerDetails.vatNumber);
      // formData.append("companyAddress", sellerDetails.companyAddress);

      const data = {
        nationalIdNumber: sellerDetails.nationalIdNumber,
        supportiveDoc: sellerDetails.supportiveDoc,
        accountType: sellerDetails.accountType,
        companyName: sellerDetails.companyName,
        positionInCompany: sellerDetails.positionInCompany,
        companyNumber: sellerDetails.companyNumber,
        vatNumber: sellerDetails.vatNumber,
        companyAddress: sellerDetails.companyAddress,
      };

      // Perform the update operation here with formData
      dispatch(updateSeller(id ,data))
        .then((response) => {
          toast("Seller Added successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
          navigate("/seller/list");
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

  return (
    <PageContainer
      pageTitleIcon="pe-7s-shopbag icon-gradient bg-plum-plate"
      pageHeading={"Edit Seller"}
      pageSubTitle={"Edit the Seller"}
    >
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
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
                        invalid={errors.nationalIdNumber !== ""}
                      />
                      {errors.nationalIdNumber && (
                        <FormFeedback>{errors.nationalIdNumber}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="supportiveDoc">Supportive Document</Label>
                      <Input
                        type="file"
                        name="supportiveDoc"
                        id="supportiveDoc"
                        onChange={handleFileInput}
                        invalid={supportiveDocErr !== ""}
                      />
                      {supportiveDocPreview && (
                        <div
                          className={styles.previewContainer}
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <img
                            width={100}
                            src={supportiveDocPreview}
                            alt="preview"
                          />
                          <a
                            href="#"
                            className={styles.deleteIcon}
                            onClick={removeSupportDoc}
                            style={{
                              position: "absolute",
                            }}
                          >
                            <i className="pe-7s-trash"></i>
                          </a>
                        </div>
                      )}
                      {supportiveDocErr !== "" && (
                        <FormFeedback>{supportiveDocErr}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
  <FormGroup>
    <Label for="accountType">Account Type</Label>
    <Input
      type="select"
      name="accountType"
      id="accountType"
      placeholder="Enter Account Type"
      value={sellerDetails.accountType}
      onChange={handleInputChange}
      invalid={errors.accountType !== ""}
    >
      <option value="">Select Account Type</option>
      <option value="personal">Personal</option>
      <option value="business">Company</option>
    </Input>
    {errors.accountType && (
      <FormFeedback>{errors.accountType}</FormFeedback>
    )}
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
                        invalid={errors.companyName !== ""}
                      />
                      {errors.companyName && (
                        <FormFeedback>{errors.companyName}</FormFeedback>
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
                        placeholder="Enter Position in Company"
                        value={sellerDetails.positionInCompany}
                        onChange={handleInputChange}
                        invalid={errors.positionInCompany !== ""}
                      />
                      {errors.positionInCompany && (
                        <FormFeedback>{errors.positionInCompany}</FormFeedback>
                      )}
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
                        invalid={errors.companyNumber !== ""}
                      />
                      {errors.companyNumber && (
                        <FormFeedback>{errors.companyNumber}</FormFeedback>
                      )}
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
                        invalid={errors.vatNumber !== ""}
                      />
                      {errors.vatNumber && (
                        <FormFeedback>{errors.vatNumber}</FormFeedback>
                      )}
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
                        invalid={errors.companyAddress !== ""}
                      />
                      {errors.companyAddress && (
                        <FormFeedback>{errors.companyAddress}</FormFeedback>
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
                    navigate(`/seller/list`);
                  }}
                  disabled={buttonDisable}
                >
                  Cancel
                </Button>
                <Button size="lg" color="primary" onClick={updateHandler} disabled={buttonDisable}>
                  Update Seller
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
}

export default EditSeller;

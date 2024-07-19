import React, { useState, useEffect } from "react";
import PageContainer from "../Layout/PageContainer";
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
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createDispute } from "../../redux/actions/dispute";

const Add = () => {
  //Configure toastify
  toast.configure();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [currentDispute, setcurrentDispute] = useState({});
  //states for handling validations

  const [reasonErr, setReasonErr] = useState("");

  const [tIdErr, setTIdErr] = useState("");

  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if(name === "transactionId") {
        setcurrentDispute({ ...currentDispute, [name]: parseInt(value) })
    } else setcurrentDispute({ ...currentDispute, [name]: value });
  };

  //validation handler
  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();
    const inputFieldName = event.target.name;
    //set error message for firstName
    if (inputFieldName === "reason") {
      if (inputValue.length < 1) {
        setReasonErr("Reason is required!");
      } else {
        setReasonErr("");
      }
    }
    if (inputFieldName === "transactionId") {
      if (inputValue.length < 1) {
        setTIdErr("Transaction Id is required!");
      } else {
        setTIdErr("");
      }
    }
  };
  
  //update form handler
  const updateHandler = (event) => {
    event.preventDefault();
    let errorCount = 0;

    if (
      currentDispute.reason === "" ||
      currentDispute.reason === null ||
      currentDispute.reason < 1
    ) {
      setReasonErr("Reason is required!");

      errorCount++;
    }
    if (
      currentDispute.transactionId === "" ||
      currentDispute.transactionId === null ||
      currentDispute.transactionId < 1
    ) {
      setTIdErr("Transaction Id is required!");

      errorCount++;
    }

    if (errorCount > 0) {
      return;
    } else {
      //dispatch to update the user
      dispatch(createDispute(currentDispute.transactionId, currentDispute.reason))
        .then((response) => {
          setcurrentDispute({ ...currentDispute });
          toast("Dispute Added successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
          setcurrentDispute({});
          navigate("/dispute/list");
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
      pageTitleIcon="pe-7s-display2 icon-gradient bg-plum-plate"
      pageHeading={"Add Dispute"}
      pageSubTitle={"Add the Dispute"}
    >
      <>
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <Form>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="title">Transaction Id</Label>
                        <Input
                          type="text"
                          name="transactionId"
                          id="transactionId"
                          placeholder="Transaction here..."
                          value={currentDispute.transactionId || ""}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="gameName">Reason</Label>
                        <Input
                          invalid={reasonErr !== "" ? true : false}
                          type="text"
                          name="reason"
                          id="reason"
                          placeholder="Reason here..."
                          value={currentDispute.reason || ""}
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                        />
                        {reasonErr !== "" && (
                          <FormFeedback>{reasonErr}</FormFeedback>
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
                      navigate(`/dispute/list`);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size="lg" color="primary" onClick={updateHandler}>
                    Add Dispute
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </>
    </PageContainer>
  );
};

export default Add;

import React, { useState } from "react";
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
import { currencies } from "../Games/data";
import { createInsurance } from "../../redux/actions/insurance";
import { useNavigate } from "react-router-dom";

toast.configure();

const CreateInsurance = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [currentPrice, setCurrentPrice] = useState("");
    const [currentCurrency, setCurrentCurrency] = useState("");
    const [currentDuration, setCurrentDuration] = useState("");
    const [PriceErr, setPriceErr] = useState("");
    const [DurationErr, setDurationErr] = useState("");
    const [CurrencyErr, setCurrencyErr] = useState("");

    const handleValidation = (event) => {
        const inputValue = event.target.value.trim();
        const inputFieldName = event.target.name;
        if (inputFieldName === "duration") {
          if (inputValue.length < 1) {
            setDurationErr("Duration is required!");
          } else {
            setDurationErr("");
          }
        }
        if (inputFieldName === "price") {
          if (inputValue.length < 1) {
            setPriceErr("Price is required!");
          } else {
            setPriceErr("");
          }
        }

        if (inputFieldName === "currency") {
            if (inputValue.length < 1) {
                setCurrencyErr("Currency is required!");
            } else {
                setCurrencyErr("");
            }
          }
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "currency") {
            setCurrentCurrency(value);
        }
    };

    const updateHandler = (event) => {
        event.preventDefault();
        let errorCount = 0;

        if (
            currentPrice === "" ||
            currentPrice === null ||
            currentPrice < 1
          ) {
            setPriceErr("Price is required!");
            errorCount++;
          }

          if (
            currentDuration === "" ||
            currentDuration === null ||
            currentDuration < 1
          ) {
            setDurationErr("Duration is required!");
            errorCount++;
          }

          if (
            currentCurrency === "" ||
            currentCurrency === null
          ) {
            setCurrencyErr("Currency is required!");
            errorCount++;
          }

          if (errorCount === 0) {
            const insuranceData = {
                "price" : currentPrice,
                "currency": currentCurrency,
                "duration" : currentDuration,
              }
              dispatch(createInsurance(insuranceData))
              .then((response) => {
                toast("Insurance Plan Added successfully!", {
                  transition: Slide,
      
                  closeButton: true,
      
                  autoClose: 3000,
      
                  position: "top-right",
      
                  type: "success", // info/success/warning/error
                });
                navigate("/insurance/list");
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
        <>
            <Row>
                <Col md="12">
                    <Card className="main-card mb-3">
                        <CardHeader className="card-header-sm">
                            <div className="card-header-title font-size-lg text-capitalize fw-normal">
                                Insurance Plan
                            </div>
                        </CardHeader>
                        <Form onSubmit={updateHandler}> 
                            <CardBody>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="price">Price</Label>
                                            <Input
                                                invalid={PriceErr !== "" ? true : false}
                                                type="text"
                                                name="price"
                                                id="price"
                                                onChange={(e) => setCurrentPrice(e.target.value)}
                                                placeholder="Price..."
                                                value={currentPrice}
                                                onKeyUp={handleValidation}
                                            />
                                            {PriceErr !== "" && (
                                                <FormFeedback>{PriceErr}</FormFeedback>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="currency">Currency</Label>
                                            <Input
                                                invalid={CurrencyErr !== "" ? true : false}
                                                type="select"
                                                name="currency"
                                                id="currency"
                                                value={currentCurrency}
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
                                            {CurrencyErr !== "" && (
                                                <FormFeedback>{CurrencyErr}</FormFeedback>
                                            )}
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="duration">Duration (days)</Label>
                                            <Input
                                                invalid={DurationErr !== "" ? true : false}
                                                type="number"
                                                name="duration"
                                                id="duration"
                                                onChange={(e) => setCurrentDuration(e.target.value)}
                                                placeholder="Duration..."
                                                value={currentDuration}
                                                onKeyUp={handleValidation}
                                            />
                                            {DurationErr !== "" && (
                                                <FormFeedback>{DurationErr}</FormFeedback>
                                            )}
                                        </FormGroup>
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className="d-block">
                                <Button
                                    className="me-2"
                                    color="link"
                                    // onClick={() => {
                                    // navigate(`/role/permission`);
                                    // }}
                                >
                                    Cancel
                                </Button>
                                <Button size="lg" color="primary" type="submit">
                                    Add 
                                </Button>
                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CreateInsurance;

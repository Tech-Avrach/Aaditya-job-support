import React, { useEffect, useState } from 'react';
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

import { useNavigate, useParams } from 'react-router-dom';
import { createBoosterplan } from '../../redux/actions/boosterplan';
import { currencies } from '../Games/data';
import boosterPlanService from '../../redux/services/boosterPlan.service';
toast.configure();
const EditBoosterplan = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [boost, setBoost] = useState("");
    const [duration, setDuration] = useState("");
    const [price, setPrice] = useState("");
    const [currency, setCurrency] = useState("Select Currency");
    
    const [nameErr, setNameErr] = useState("");
    const [boostErr, setBoostErr] = useState("");
    const [durationErr, setDurationErr] = useState("");
    const [priceErr, setPriceErr] = useState("");


    useEffect(() => {
        const getBoosterplan = (id) => {
            boosterPlanService.get(id).then((response) => {
                if (response && response.data) {
                    setName(response.data.boosterPlanInfo.name);
                    setBoost(response.data.boosterPlanInfo.boost);
                    setDuration(response.data.boosterPlanInfo.duration);
                    setPrice(response.data.boosterPlanInfo.price);
                    setCurrency(response.data.boosterPlanInfo.currency);
                }
            });
        };
        getBoosterplan(id);
    }, [id, dispatch]);

    const handleValidation = (event) => {
        const inputValue = event.target.value.trim();
        const inputFieldName = event.target.name;

        if (inputFieldName === "name") {
            if (inputValue.length < 1) {
                setNameErr("Name is required!");
            } else {
                setNameErr("");
            }
        }

        if (inputFieldName === "boost") {
            if (isNaN(inputValue) || inputValue.length < 1) {
                setBoostErr("Boost is required and must be a number!");
            } else {
                setBoostErr("");
            }
        }

        if (inputFieldName === "duration") {
            if (isNaN(inputValue) || inputValue.length < 1) {
                setDurationErr("Duration is required and must be a number!");
            } else {
                setDurationErr("");
            }
        }

        if (inputFieldName === "price") {
            if (isNaN(inputValue) || inputValue.length < 1) {
                setPriceErr("Price is required and must be a number!");
            } else {
                setPriceErr("");
            }
        }
    };

    const updateHandler = (event) => {
        event.preventDefault();

        let errorCount = 0;
        if (name === "") {
            setNameErr("Name is required!");
            errorCount++;
        }

        if (boost === "" || isNaN(boost)) {
            setBoostErr("Boost is required and must be a number!");
            errorCount++;
        }

        if (duration === "" || isNaN(duration)) {
            setDurationErr("Duration is required and must be a number!");
            errorCount++;
        }

        if (price === "" || isNaN(price)) {
            setPriceErr("Price is required and must be a number!");
            errorCount++;
        }

        if (errorCount > 0) {
            return;
        } else {
            const data = {
                name: name,
                boost: boost,
                duration: duration,
                price: price
            };

            console.log(data);
            dispatch(createBoosterplan(data))
                .then((response) => {
                    toast("Boosterplan Created successfully!", {
                        transition: Slide,
                        closeButton: true,
                        autoClose: 3000,
                        position: "top-right",
                        type: "success",
                    });
                    navigate("/boosterplan/list");
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

    return (
        <>
            <Row>
                <Col md="12">
                    <Card className="main-card mb-3">
                        <CardHeader className="card-header-sm">
                            <div className="card-header-title font-size-lg text-capitalize fw-normal">
                                Update Boosterplan
                            </div>
                        </CardHeader>
                        <Form onSubmit={updateHandler}>
                            <CardBody>
                                <Row>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="name">Name</Label>
                                            <Input
                                                invalid={nameErr !== "" ? true : false}
                                                type="text"
                                                name="name"
                                                id="name"
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Name..."
                                                value={name}
                                                onKeyUp={handleValidation}
                                            />
                                            {nameErr !== "" && <FormFeedback>{nameErr}</FormFeedback>}
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="boost">Boost</Label>
                                            <Input
                                                invalid={boostErr !== "" ? true : false}
                                                type="number"
                                                name="boost"
                                                id="boost"
                                                onChange={(e) => setBoost(e.target.value)}
                                                placeholder="Boost..."
                                                value={boost}
                                                onKeyUp={handleValidation}
                                            />
                                            {boostErr !== "" && <FormFeedback>{boostErr}</FormFeedback>}
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="duration">Duration</Label>
                                            <Input
                                                invalid={durationErr !== "" ? true : false}
                                                type="number"
                                                name="duration"
                                                id="duration"
                                                onChange={(e) => setDuration(e.target.value)}
                                                placeholder="Duration..."
                                                value={duration}
                                                onKeyUp={handleValidation}
                                            />
                                            {durationErr !== "" && <FormFeedback>{durationErr}</FormFeedback>}
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                                        <FormGroup>
                                            <Label for="price">Price</Label>
                                            <Input
                                                invalid={priceErr !== "" ? true : false}
                                                type="number"
                                                name="price"
                                                id="price"
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder="Price..."
                                                value={price}
                                                onKeyUp={handleValidation}
                                            />
                                            {priceErr !== "" && <FormFeedback>{priceErr}</FormFeedback>}
                                        </FormGroup>
                                    </Col>
                                    <Col md="6">
                    <FormGroup>
                      <Label for="currency">Currency</Label>
                      <Input
                        type="select"
                        name="currency"
                        id="currency"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                      >
                        <option value=""> Select Currency </option>
                        {currencies &&
                          currencies.map((currency, index) => (
                            <option key={index} value={currency.code}>
                              {currency.name}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                                </Row>
                            </CardBody>
                            <CardFooter className="d-block">
                                <Button
                                    className="me-2"
                                    color="link"
                                    onClick={() => navigate("/boosterplan/list")}
                                >
                                    Cancel
                                </Button>
                                <Button size="lg" color="primary" type="submit">
                                    Update
                                </Button>
                            </CardFooter>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default EditBoosterplan;

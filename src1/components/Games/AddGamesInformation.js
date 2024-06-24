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
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import users action
import { createGame } from "../../redux/actions/game";
import { categories, currencies, platforms, regions } from "./data";
//import states action
// import { retrieveStates } from "../../redux/actions/states";

//Configure toastify
toast.configure();

const AddGameInformation = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [currentGame, setCurrentGame] = useState({});
  //states for handling validations

  const [gameErr, setGameErr] = useState("");

  const [priceErr, setPriceErr] = useState("");

  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCurrentGame({ ...currentGame, [name]: value });
  };

  //validation handler
  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();
    const inputFieldName = event.target.name;
    //set error message for firstName
    if (inputFieldName === "gameName") {
      if (inputValue.length < 1) {
        setGameErr("GameName is required!");
      } else {
        setGameErr("");
      }
    }
    if (inputFieldName === "price") {
      if (inputValue.length < 1) {
        setPriceErr("Price is required!");
      } else {
        setPriceErr("");
      }
    }
  };

  //update form handler
  const updateHandler = (event) => {
    event.preventDefault();
    let errorCount = 0;

    if (
      currentGame.gameName === "" ||
      currentGame.gameName === null ||
      currentGame.gameName < 1
    ) {
      setGameErr("Game name is required!");

      errorCount++;
    }
    if (
      currentGame.price === "" ||
      currentGame.price === null ||
      currentGame.price < 1
    ) {
      setGameErr("Price name is required!");

      errorCount++;
    }

    if (errorCount > 0) {
      return;
    } else {
      //dispatch to update the user
      dispatch(createGame(currentGame))
        .then((response) => {
          setCurrentGame({ ...currentGame });
          toast("Game Added successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
          setCurrentGame({});
          navigate("/games/list");
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
            <Form>
              <CardBody>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="title">Title</Label>
                      <Input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title here..."
                        value={currentGame.title ? currentGame.title : ""}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="gameName">Game Name</Label>
                      <Input
                        invalid={gameErr !== "" ? true : false}
                        type="text"
                        name="gameName"
                        id="gameName"
                        placeholder="Game Name here..."
                        value={currentGame.gameName ? currentGame.gameName : ""}
                        onChange={handleInputChange}
                        onKeyUp={handleValidation}
                      />
                      {gameErr !== "" && <FormFeedback>{gameErr}</FormFeedback>}
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="platform">Platform</Label>
                      <Input
                        type="select"
                        name="platform"
                        id="platform"
                        value={
                          currentGame.platform != null
                            ? currentGame.platform
                            : ""
                        }
                        onChange={handleInputChange}
                      >
                        <option value=""> Select Platform </option>
                        {platforms &&
                          platforms.map((platform, index) => (
                            <option key={index} value={platform.code}>
                              {platform.name}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Category</Label>
                      <Input
                        type="select"
                        name="category"
                        id="category"
                        value={
                          currentGame.category != null
                            ? currentGame.category
                            : ""
                        }
                        onChange={handleInputChange}
                      >
                        <option value=""> Select Category </option>
                        {categories &&
                          categories.map((category, index) => (
                            <option key={index} value={category.code}>
                              {category.name}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                    <FormGroup>
                      <Label for="region">Region</Label>
                      <Input
                        type="select"
                        name="region"
                        id="region"
                        value={
                          currentGame.region != null ? currentGame.region : ""
                        }
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
                  <Col md="6">
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description here..."
                        value={
                          currentGame.description ? currentGame.description : ""
                        }
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  
                  <Col md="6">
                    <FormGroup>
                      <Label for="price">Price</Label>
                      <Input
                        invalid={priceErr !== "" ? true : false}
                        type="text"
                        name="price"
                        id="price"
                        placeholder="Price here..."
                        value={currentGame.price ? currentGame.price : ""}
                        onChange={handleInputChange}
                        onKeyUp={handleValidation}
                      />
                      {priceErr !== "" && (
                        <FormFeedback>{priceErr}</FormFeedback>
                      )}
                    </FormGroup>
                  </Col>
                 
                  <Col md="6">
                    <FormGroup>
                      <Label for="currency">Currency</Label>
                      <Input
                        type="select"
                        name="currency"
                        id="currency"
                        value={
                          currentGame.currency != null
                            ? currentGame.currency
                            : ""
                        }
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
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="quanity">Quanity</Label>
                      <Input
                        type="text"
                        name="quanity"
                        id="quanity"
                        placeholder="Quanity here..."
                        value={currentGame.quanity ? currentGame.quanity : ""}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="adKey">AdKey</Label>
                      <Input
                        type="text"
                        name="adKey"
                        id="adKey"
                        placeholder="AdKey here..."
                        value={currentGame.adKey ? currentGame.adKey : ""}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="deliveryTime">DeliveryTime</Label>
                      <Input
                        type="text"
                        name="deliveryTime"
                        id="deliveryTime"
                        placeholder="DeliveryTime here..."
                        value={
                          currentGame.deliveryTime
                            ? currentGame.deliveryTime
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
                    navigate(`/games/list`);
                  }}
                >
                  Cancel
                </Button>
                <Button size="lg" color="primary" onClick={updateHandler}>
                  Add Games
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddGameInformation;

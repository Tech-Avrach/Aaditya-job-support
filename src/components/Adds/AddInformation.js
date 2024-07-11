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

const AddInformation = ({ addDetail }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [currentAdd, setCurrentAdd] = useState(addDetail);

  //states for handling validations

  const [firstNameErr, setFirstNameErr] = useState("");

  const [emailErr, setEmailErr] = useState("");

  const [phoneNumberErr, setPhoneNumberErr] = useState("");


  useEffect(() => {
    if (addDetail !== undefined) {
      setCurrentAdd(addDetail); //set user details in the state when userDetail changes
    }
  }, [addDetail]);
  return (
    <>
      {currentAdd ? (
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-sm">
                <div className="card-header-title font-size-lg text-capitalize fw-normal">
                  Add Information
                </div>
              </CardHeader>
              <Form>
                <CardBody>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="firstName">Game Name</Label>
                        <Input
                          type="text"
                          name="game_name"
                          id="game_name"
                          placeholder="Game Name here..."
                          value={
                            currentAdd.game_name ? currentAdd.game_name : ""
                          }
                          readOnly
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <Label for="platform">Platform</Label>
                        <Input
                          readOnly
                          type="text"
                          name="platform"
                          id="platform"
                          placeholder="Last Name here..."
                          value={currentAdd.platform ? currentAdd.platform : ""}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="price">Price</Label>
                        <Input
                          type="text"
                          name="price"
                          id="price"
                          placeholder="price address here..."
                          value={currentAdd.price ? currentAdd.price : ""}
                          readOnly={true}
                        />
                      </FormGroup>
                    </Col>{" "}
                    <Col md="6">
                      <FormGroup>
                        <Label for="created_at">Create Date</Label>
                        <Input
                          type="text"
                          name="created_at"
                          id="created_at"
                          placeholder="created_at address here..."
                          value={
                            currentAdd.created_at ? currentAdd.created_at : ""
                          }
                          readOnly={true}
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
                      navigate(`/roll/all`);
                    }}
                  >
                    Cancel
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

export default AddInformation;

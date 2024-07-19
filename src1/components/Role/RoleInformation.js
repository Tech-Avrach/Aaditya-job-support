import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
//import states action
import Loader from "react-loaders";
import { retrieveSingaleRole, updateRole } from "../../redux/actions/roles";

//Configure toastify
toast.configure();

const RoleInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [currentRole, setcurrentRole] = useState(null);

  //states for handling validations

  const [nameErr, setnameErr] = useState("");

  useEffect(() => {
    dispatch(retrieveSingaleRole(id))
    .then(res => {
      setcurrentRole(res);
    })
  }, [])

  // useEffect(() => {
  //   if (roleDetail !== undefined) {
  //     setcurrentRole(roleDetail); //set user details in the state when roleDetail changes
  //   }
  // }, [roleDetail]);

  //input change handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setcurrentRole({ ...currentRole, [name]: value });
  };

  //validation handler
  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();

    const inputFieldName = event.target.name;

    //set error message for name
    if (inputFieldName === "name") {
      if (inputValue.length < 1) {
        setnameErr("Name is required!");
      } else {
        setnameErr("");
      }
    }
  };

  const updateAccount = (event) => {
    event.preventDefault();
    let message = "Role updated successfully!";
    dispatch(updateRole(id, currentRole))
      .then((response) => {
        toast(message, {
          transition: Slide,
          closeButton: true,
          autoClose: 3000,
          position: "top-right",
          type: "success", // info/success/warning/error
        });
        navigate("/role/list")
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

  const activeOptions = [
    { code: 1, name: "Active" },
    { code: 0, name: "Inactive" },
  ];
  return (
    <>
      {currentRole ? (
        <Row>
          <Col md="12">
            <Card className="main-card mb-3">
              <CardHeader className="card-header-sm">
                <div className="card-header-title font-size-lg text-capitalize fw-normal">
                  Role Information
                </div>
              </CardHeader>
              <Form>
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
                          placeholder="Role here..."
                          value={currentRole?.name ? currentRole?.name : ""}
                          onChange={handleInputChange}
                          onKeyUp={handleValidation}
                        />
                        {nameErr !== "" && (
                          <FormFeedback>{nameErr}</FormFeedback>
                        )}
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
                            currentRole?.description
                              ? currentRole?.description
                              : ""
                          }
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {/* <Row>
                    <Col md="6">
                      <FormGroup>
                        <Label for="isActive">Active</Label>
                        <Input
                          type="select"
                          name="isActive"
                          id="isActive"
                          value={
                            currentRole.isActive != null
                              ? currentRole.isActive
                              : ""
                          }
                          onChange={handleInputChange}
                        >
                          {activeOptions &&
                            activeOptions.map((isActive, index) => (
                              <option key={index} value={isActive.code}>
                                {isActive.name}
                              </option>
                            ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row> */}
                </CardBody>
                <CardFooter className="d-block">
                  <Button
                    className="me-2"
                    color="link"
                    onClick={() => {
                      navigate(`/role/list`);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button size="lg" color="primary" onClick={updateAccount}>
                    Update
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

export default RoleInformation;

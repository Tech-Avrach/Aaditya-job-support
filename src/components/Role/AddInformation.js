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
import { createRole } from "../../redux/actions/roles";
//import states action

//Configure toastify
toast.configure();

const AddInformation = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [currentRole, setCurrentRole] = useState({
    name: "",
    isActive: 1,
    description: "",
  });

  const [nameErr, setNameErr] = useState("");
  const [descriptionErr, setDescriptionErr] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCurrentRole((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();

    const inputFieldName = event.target.name;
    if (inputFieldName === "name") {
      if (inputValue.length < 1) {
        setNameErr("Role Name is required!");
      } else {
        setNameErr("");
      }
    }
    if (descriptionErr === "name") {
      if (descriptionErr.length < 1) {
        setDescriptionErr("Role Name is required!");
      } else {
        setDescriptionErr("");
      }
    }
  };

  const updateHandler = (event) => {
    event.preventDefault();
    let errorCount = 0;
    if (
      currentRole.name === "" ||
      currentRole.name === null ||
      currentRole.name < 1
    ) {
      setNameErr("Role Name is required!");
      errorCount++;
    }

    if (errorCount > 0) {
      return;
    } else {
      dispatch(createRole(currentRole))
        .then((response) => {
          toast("Role Created successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
          navigate("/role/permission");
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
                Create New Role
              </div>
            </CardHeader>
            <Form>
              <CardBody>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="name">Role Name</Label>
                      <Input
                        invalid={nameErr !== "" ? true : false}
                        onChange={handleChange}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Role Name here..."
                        value={currentRole.name ? currentRole.name : ""}
                        onKeyUp={handleValidation}
                      />
                      {nameErr !== "" && <FormFeedback>{nameErr}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="description">Description</Label>
                      <Input
                        invalid={descriptionErr !== "" ? true : false}
                        onChange={handleChange}
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description Name here..."
                        value={
                          currentRole.description ? currentRole.description : ""
                        }
                        onKeyUp={handleValidation}
                      />
                      {descriptionErr !== "" && (
                        <FormFeedback>{descriptionErr}</FormFeedback>
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
                    navigate(`/role/permission`);
                  }}
                >
                  Cancel
                </Button>
                <Button size="lg" color="primary" onClick={updateHandler}>
                  Add Role
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AddInformation;

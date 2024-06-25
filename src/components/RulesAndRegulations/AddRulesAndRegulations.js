import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { toast, Slide } from "react-toastify";
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

import { createRule } from "../../redux/actions/rules"

const AddRulesAndRegulations = () => {

    const dispatch = useDispatch();

    const [currentRules, setCurrentRules] = useState({
        rulesRegText: "",
    });
    const [rulesErr, setRulesErr] = useState("");


    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCurrentRules((prev) => {
          return {
            ...prev,
            [name]: value,
          };
        });
      };


    const handleValidation = (event) => {
        const inputValue = event.target.value.trim();
    
        const inputFieldName = event.target.name;
        if (inputFieldName === "rulesRegText") {
          if (inputValue.length < 1) {
            setRulesErr("Rule is required!");
          } else {
            setRulesErr("");
          }
        }

        // console.log(inputValue)
      };

      const updateHandler = (event) => {
        event.preventDefault();

        console.log(currentRules)
        let errorCount = 0;
        if (
          currentRules.rulesRegText === "" ||
          currentRules.rulesRegText === null ||
          currentRules.rulesRegText < 1
        ) {
          setRulesErr("Rule is required!");
          errorCount++;
        }
    
        if (errorCount > 0) {
          return;
        } else {
          dispatch(createRule(currentRules))
            .then((response) => {
              toast("Role Created successfully!", {
                transition: Slide,
    
                closeButton: true,
    
                autoClose: 3000,
    
                position: "top-right",
    
                type: "success", // info/success/warning/error
              });
            //   navigate("/role/permission");
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
                Create New Rule
              </div>
            </CardHeader>
            <Form>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label for="name">Add Rule</Label>
                      <Input
                        invalid={rulesErr !== "" ? true : false}
                        type="text"
                        name="rulesRegText"
                        id="rules"
                        onChange={handleChange}
                        placeholder="Role Name here..."
                        // value={currentRole.name ? currentRole.name : ""}
                        onKeyUp={handleValidation}
                      />
                      {rulesErr !== "" && <FormFeedback>{rulesErr}</FormFeedback>}
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter className="d-block">
                <Button
                  className="me-2"
                  color="link"
                //   onClick={() => {
                //     navigate(`/role/permission`);
                //   }}
                >
                  Cancel
                </Button>
                <Button size="lg" color="primary" onClick={updateHandler}>
                  Add Rule
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default AddRulesAndRegulations
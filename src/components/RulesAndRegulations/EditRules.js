import React, { useEffect, useState } from 'react'
import { useDispatch, } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

  import { updateRule } from "../../redux/actions/rules"

import RulesService from "../../redux/services/rules.service";

toast.configure();

const EditRules = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentRules, setCurrentRules] = useState({
        rulesRegText: "",
    });
    const [rulesErr, setRulesErr] = useState("");

    useEffect(() => {
      const getRule = (id) => {
            RulesService
            .get(id)
            .then((response) => {

                console.log(response.data.rulInfo)
                setCurrentRules(response.data.rulInfo);
            })
            .catch((error) => {
              toast(error, {
                transition: Slide,
                closeButton: true,
                autoClose: 3000,
                position: "top-right",
                type: "error",
              });
            });
        };
        getRule(id);
      }, []);
    


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

        let errorCount = 0;
        if (
          currentRules.rulesRegText === "" ||
          currentRules.rulesRegText === null ||
          currentRules.rulesRegText < 1
        ) {
          setRulesErr("Rule is required!");
          errorCount++;
        }

        if ( currentRules.rulesRegText.length < 10 ) {
            setRulesErr("Rules regulation must have minimum 10 character length !");
            errorCount++;
        }
    
        if (errorCount > 0) {
          return;
        } else {
          dispatch(updateRule(id, currentRules))
            .then((response) => {
              toast("Role updated successfully!", {
                transition: Slide,
    
                closeButton: true,
    
                autoClose: 3000,
    
                position: "top-right",
    
                type: "success", // info/success/warning/error
              });
              navigate("/rules/list");
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
                Update Rule
              </div>
            </CardHeader>
            <Form>
              <CardBody>
                <Row>
                  <Col md="12">
                    <FormGroup>
                      <Label for="name">Update Rule</Label>
                      <Input
                        invalid={rulesErr !== "" ? true : false}
                        type="text"
                        name="rulesRegText"
                        id="rules"
                        value={currentRules.rulesRegText}
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
                Update Rule
                </Button>
              </CardFooter>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default EditRules
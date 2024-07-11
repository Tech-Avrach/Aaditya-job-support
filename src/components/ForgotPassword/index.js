import React, { useState, useRef } from "react";
import { Col, Row, Button, Form, FormGroup, FormFeedback, Label, Input } from "reactstrap";
import { toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//import common service for forgot password
import CommonService from "../../redux/services/common.service";
import { Link } from "react-router-dom";
toast.configure();

const ForgotPassword = () => {

  const form = useRef();

  const [email, setEmail] = useState("");

  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  const [loading, setLoading] = useState(false);

  const onChangeEmail = (event) => {

    const email = event.target.value;

    setEmail(email);

  };

  const handleValidation = (event) => {

    const inputValue = event.target.value.trim();

    const inputFieldName = event.target.name;

    //set error message for email
    if (inputFieldName === 'email') {

      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!(emailRegex.test(inputValue)) || inputValue.length === 0) {

        setEmailErrorMsg("Please enter a valid email address!");

      } else {

        setEmailErrorMsg("");

      }

    }

  }

  const clearFormValues = ()=>{
    setEmail("")
    setEmailErrorMsg("")
  }

  const handleForgotPassword = event => {

    event.preventDefault();

    setLoading(true);

    let errorCount = 0;

    if (email === '') {

      setEmailErrorMsg("Please enter a valid email address!");

      errorCount++;

    } else {

      setEmailErrorMsg("");

    }

    if (errorCount > 0) {

      setLoading(false);

      return;

    } else {

      CommonService.forgotPassword(email)
        .then((response) => {

          setLoading(false);
          clearFormValues()
          toast(response.data.message, {

            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error

          });

        }, (error) => {

          const errorMsg = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

          setLoading(false);

          toast(errorMsg, {

            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "error", // info/success/warning/error

          });

        }

        );

    }
  };

  return (
    <div className="app-container">
      <div className="h-100 bg-plum-plate bg-animation">
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Col md="6" className="mx-auto app-login-box">
            {/* <div className="app-logo-inverse mx-auto mb-3" /> */}
            <div className="modal-dialog w-100">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="h5 modal-title">
                    Forgot your Password?
                    <h6 className="mt-1 mb-0 opacity-8">
                      <span>Enter the email address below to recover it.</span>
                    </h6>
                  </div>
                </div>
                <div className="modal-body">
                  <Form onSubmit={handleForgotPassword} ref={form}>
                    <Row form="true">
                      <Col md={12}>
                        <FormGroup>
                          <Label for="email">Email</Label>
                          <Input
                            invalid={emailErrorMsg !== '' ? true : false}
                            type="email"
                            name="email"
                            id="forgotPswdEmail"
                            placeholder="Email here..."
                            value={email}
                            onChange={onChangeEmail}
                            onKeyUp={handleValidation}
                          />
                          {emailErrorMsg !== '' &&
                            <FormFeedback>
                              {emailErrorMsg}
                            </FormFeedback>
                          }
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="modal-footer clearfix">
                      <div className="float-start">
                        {/* <Link to="/reset-password" className="btn-lg btn btn-link"> */}
                          <Link to="/login" className="btn-lg btn btn-link">

                          Sign in to your existing account
                        </Link>
                      </div>
                      <div className="float-end">
                        <Button color="primary" size="lg" disabled={loading}>
                          {/* {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )} */}
                          Send Reset Code
                        </Button>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </div>
      </div>
    </div>
  )
};

export default ForgotPassword;

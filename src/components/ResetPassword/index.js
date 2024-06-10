import React, { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
} from "reactstrap";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommonService from "../../redux/services/common.service";
toast.configure();

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get("token");

  const form = useRef();

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [cnfPasswordErr, setCnfPasswordErr] = useState("");

  const [loading, setLoading] = useState(false);

  const clearFormValues = () => {
    setNewPassword("");
    setConfirmPassword("");
  };

  const onChangeNewPassword = (e) => {
    const newPassword = e.target.value;

    setNewPassword(newPassword);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmPassword = e.target.value;

    setConfirmPassword(confirmPassword);
  };

  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();

    const inputFieldName = event.target.name;

    //for password
    if (inputFieldName === "newPassword") {
      const uppercaseRegExp = /(?=.*?[A-Z])/;

      const lowercaseRegExp = /(?=.*?[a-z])/;

      const digitsRegExp = /(?=.*?[0-9])/;

      const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;

      const minLengthRegExp = /.{8,}/;

      const uppercasePassword = uppercaseRegExp.test(inputValue);

      const lowercasePassword = lowercaseRegExp.test(inputValue);

      const digitsPassword = digitsRegExp.test(inputValue);

      const specialCharPassword = specialCharRegExp.test(inputValue);

      const minLengthPassword = minLengthRegExp.test(inputValue);

      if (!uppercasePassword) {
        setPasswordErrorMsg("Password must contain atleast one uppercase!");
      } else if (!lowercasePassword) {
        setPasswordErrorMsg("Password must contain atleast one lowercase!");
      } else if (!digitsPassword) {
        setPasswordErrorMsg("Password must contain atleast one digit!");
      } else if (!specialCharPassword) {
        setPasswordErrorMsg(
          "Password must contain atleast one special character!"
        );
      } else if (!minLengthPassword) {
        setPasswordErrorMsg("Password must contain a minumum of 8 characters!");
      } else {
        setPasswordErrorMsg("");
      }

      if (inputValue !== confirmPassword) {
        setCnfPasswordErr("Confirm password doesn't match!");
      } else {
        setCnfPasswordErr("");
      }
    }

    //set error message for confirm password
    if (inputFieldName === "confirmPassword") {
      if (inputValue !== newPassword) {
        setCnfPasswordErr("Confirm password doesn't match!");
      } else {
        setCnfPasswordErr("");
      }
    }
  };

  //reset password handler
  const handleResetPassword = (event) => {
    event.preventDefault();

    setLoading(true);

    let errorCount = 0;

    if (newPassword === "") {
      setPasswordErrorMsg("Please enter the new password!");

      errorCount++;
    } else {
      setPasswordErrorMsg("");
    }

    if (confirmPassword === "") {
      setCnfPasswordErr("Please confirm your password!");

      errorCount++;
    } else {
      setCnfPasswordErr("");
    }

    if (errorCount > 0) {
      setLoading(false);

      return;
    } else {
      CommonService.resetPassword(newPassword, confirmPassword, token).then(
        (response) => {
          setLoading(false);
          clearFormValues();
          toast(response.data.message, {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
          navigate("/login");
        },
        (error) => {
          const errorMsg =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          clearFormValues();
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
            <div className="app-logo-inverse mx-auto mb-3" />
            <div className="modal-dialog w-100">
              <div className="modal-content">
                <div className="modal-header">
                  <div className="h5 modal-title">
                    Reset your password
                    <h6 className="mt-1 mb-0 opacity-8">
                      <span>
                        Enter the new and confirm password to reset it.
                      </span>
                    </h6>
                  </div>
                </div>
                <div className="modal-body">
                  <Form onSubmit={handleResetPassword} ref={form}>
                    <Row form="true">
                      <Col md={12}>
                        <FormGroup>
                          <Label for="newPassword">New Password</Label>
                          <Input
                            invalid={passwordErrorMsg !== "" ? true : false}
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="New password here..."
                            value={newPassword}
                            onChange={onChangeNewPassword}
                            onKeyUp={handleValidation}
                          />
                          {passwordErrorMsg !== "" && (
                            <FormFeedback>{passwordErrorMsg}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Label for="confirmPassword">Confirm Password</Label>
                          <Input
                            invalid={cnfPasswordErr !== "" ? true : false}
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm password here..."
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                            onKeyUp={handleValidation}
                          />
                          {cnfPasswordErr !== "" && (
                            <FormFeedback>{cnfPasswordErr}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <div className="modal-footer clearfix">
                      <div className="float-start">
                        <a href="/login" className="btn-lg btn btn-link">
                          Sign in to your existing account
                        </a>
                      </div>
                      <div className="float-end">
                        <Button color="primary" size="lg" disabled={loading}>
                          {/* {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )} */}
                          Reset Password
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
  );
};

export default ResetPassword;

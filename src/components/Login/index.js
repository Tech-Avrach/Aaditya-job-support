import React, { useState, useRef, useEffect } from "react";
// import bcrypt from 'bcryptjs';
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  Form,
  Input,
  FormFeedback,
} from "reactstrap";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import auth action
import { login } from "../../redux/actions/auth";

//Configure toastify
toast.configure();
console.log("one")

const Login = () => {
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const form = useRef();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);

  const [emailErrorMsg, setEmailErrorMsg] = useState("");

  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");

  const [resMessage, setResMessage] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);

  const { message } = useSelector((state) => state.message);

  const clearFormValues = () => {
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setResMessage(message);

    if (message) {
      toast(message, {
        transition: Slide,

        closeButton: true,

        autoClose: 3000,

        position: "top-right",

        type: "error", // info/success/warning/error
      });
    }
  }, [message]);

  const onChangeEmail = (event) => {
    const email = event.target.value;

    setEmail(email);
  };

  const onChangePassword = (event) => {
    const password = event.target.value;

    setPassword(password);
  };

  const onChangeRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleValidation = (event) => {
    const inputValue = event.target.value.trim();

    const inputFieldName = event.target.name;

    //set error message for email

    if (inputFieldName === "email") {
      const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (!emailRegex.test(inputValue) || inputValue.length === 0) {
        setEmailErrorMsg("Please enter a valid email address!");
      } else {
        setEmailErrorMsg("");
      }
    }

    //for password
    if (inputFieldName === "password") {
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
        setPasswordErrorMsg("Password must contain atleast one lowercase");
      } else if (!digitsPassword) {
        setPasswordErrorMsg("Password must contain atleast one digit");
      } else if (!specialCharPassword) {
        setPasswordErrorMsg(
          "Password must contain atleast one Special Characters"
        );
      } else if (!minLengthPassword) {
        setPasswordErrorMsg("Password must contain minumum 8 characters");
      } else {
        setPasswordErrorMsg("");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    let errorCount = 0;

    setLoading(true);

    if (email === "") {
      setEmailErrorMsg("Please enter a valid email address!");

      errorCount++;
    } else {
      setEmailErrorMsg("");
    }

    if (password === "") {
      setPasswordErrorMsg("Please enter your password!");

      errorCount++;
    } else {
      setPasswordErrorMsg("");
    }

    if (errorCount > 0) {
      setLoading(false);

      return;
    } else {
      //const hashedPassword = bcrypt.hashSync(password, 10);
      dispatch(login(email, password, rememberMe))
        .then(() => {
          clearFormValues();
          navigate("/dashboard");
          window.location.reload();
        })
        .catch(() => {
          clearFormValues();
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      return <Navigate to="/dashboard" />;
    }
  }, [isLoggedIn]);
  return (
    <div className="app-container">
      <div className="h-100 bg-plum-plate bg-animation">
        <div className="d-flex h-100 justify-content-center align-items-center">
          <Col md="8" className="mx-auto app-login-box">
            {/* <div className="app-logo-inverse mx-auto mb-3" /> */}
            <div className="modal-dialog w-100 mx-auto">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="h5 modal-title text-center">
                    <h4 className="mt-2">
                      <span>Please sign in to your account below.</span>
                    </h4>
                  </div>
                  <Form onSubmit={handleLogin} ref={form}>
                    <Row form="true">
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            invalid={emailErrorMsg !== "" ? true : false}
                            type="email"
                            name="email"
                            id="loginEmail"
                            placeholder="Email here..."
                            value={email}
                            onChange={onChangeEmail}
                            onKeyUp={handleValidation}
                          />
                          {emailErrorMsg !== "" && (
                            <FormFeedback>{emailErrorMsg}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                      <Col md={12}>
                        <FormGroup>
                          <Input
                            invalid={passwordErrorMsg !== "" ? true : false}
                            type="password"
                            name="password"
                            id="loginPassword"
                            placeholder="Password here..."
                            value={password}
                            onChange={onChangePassword}
                            onKeyUp={handleValidation}
                          />
                          {passwordErrorMsg !== "" && (
                            <FormFeedback>{passwordErrorMsg}</FormFeedback>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup check>
                      <Input
                        type="checkbox"
                        name="rememberMe"
                        id="rememberMe"
                        onChange={onChangeRememberMe}
                      />
                      <Label for="rememberMe" check>
                        Keep me logged in
                      </Label>
                    </FormGroup>
                    <div className="modal-footer clearfix">
                      <div className="float-start">
                        <Link
                          to="/forgot-password"
                          className="btn-lg btn btn-link"
                        >
                          Recover Password
                        </Link>
                      </div>
                      <div className="float-end">
                        <Button color="primary" size="lg" disabled={loading}>
                          {/* {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )} */}
                          Login to Dashboard
                        </Button>
                      </div>
                    </div>
                    {/* {resMessage && (
                        <FormGroup>
                          <Label for="alert">
                            {resMessage}
                          </Label>
                        </FormGroup>
                      )} */}
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

export default Login;

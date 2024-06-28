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

  import { updateFaq } from "../../redux/actions/faq"

import faqService from "../../redux/services/faq.service";

toast.configure();

const EditFaq = () => {

    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentRules, setCurrentRules] = useState({
        rulesRegText: "",
    });
    const [rulesErr, setRulesErr] = useState("");

    const [currentQuestion, setCurrentQuestion] = useState("");
    const [currentAnswer, setCurrentAnswer] = useState("");
    const [questionErr, setQuestionErr] = useState("");
    const [answerErr, setAnswerErr] = useState("");

    

    useEffect(() => {
      const getRule = (id) => {
          faqService
            .get(id)
            .then((response) => {

                console.log(response.data)
                setCurrentQuestion(response?.data?.faqInfo?.question);
                setCurrentAnswer(response?.data?.faqInfo?.answer);
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
    

      const handleValidation = (event) => {
        const inputValue = event.target.value.trim();
    
        const inputFieldName = event.target.name;
        if (inputFieldName === "question") {
          if (inputValue.length < 1) {
            setQuestionErr("Question is required!");
          } else {
            setQuestionErr("");
          }
        }

        if (inputFieldName === "answer") {
          if (inputValue.length < 1) {
            setAnswerErr("Answer is required!");
          } else {
            setAnswerErr("");
          }
        }

        // console.log(inputValue)
      };

      const updateHandler = (event) => {
        event.preventDefault();

        let errorCount = 0;
        if (
          currentQuestion === "" ||
          currentQuestion === null ||
          currentQuestion < 1
        ) {
          setQuestionErr("Question is required!");
          errorCount++;
        }

        if(
          currentAnswer === "" ||
          currentAnswer === null ||
          currentAnswer < 1
        ) {
          setAnswerErr("Answer is required!");
          errorCount++;
        } 
    
        if (errorCount > 0) {
          return;
        } else {

          const data = {
            "question": currentQuestion,
            "answer": currentAnswer,
          };

          console.log(data);
          dispatch(updateFaq(id, data))
            .then((response) => {
              toast("QNA Updated successfully!", {
                transition: Slide,
    
                closeButton: true,
    
                autoClose: 3000,
    
                position: "top-right",
    
                type: "success", // info/success/warning/error
              });
              navigate("/faq/list");
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
                 Frequently Asked  & Question
              </div>
            </CardHeader>
            <Form>
              <CardBody>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <Label for="name">Question</Label>
                      <Input
                        invalid={questionErr !== "" ? true : false}
                        type="text"
                        name="question"
                        id="question"
                        onChange={(e) => setCurrentQuestion(e.target.value)}
                        placeholder="Question..."
                        value={currentQuestion ? currentQuestion : ""}
                        onKeyUp={handleValidation}
                      />
                      {questionErr !== "" && <FormFeedback>{questionErr}</FormFeedback>}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label for="name">Answer</Label>
                      <Input
                        invalid={answerErr !== "" ? true : false}
                        type="text"
                        name="rulesRegText"
                        id="rules"
                        onChange={(e) => setCurrentAnswer(e.target.value)}
                        placeholder="Answer..."
                        value={currentAnswer ? currentAnswer : ""}
                        onKeyUp={handleValidation}
                      />
                      {answerErr !== "" && <FormFeedback>{answerErr}</FormFeedback>}
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

export default EditFaq
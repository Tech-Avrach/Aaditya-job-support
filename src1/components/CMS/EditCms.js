
import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  CardFooter,
} from "reactstrap";
import { CKEditor } from "ckeditor4-react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import cmsService from "../../redux/services/cms.service";
import Parser from 'html-react-parser';
import { updateCms } from "../../redux/actions/cms";
import { toast, Slide } from "react-toastify";
import { useDispatch } from "react-redux";

toast.configure();

const EditCms = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [slugErr, setSlugErr] = useState('');

  useEffect(() => {
    cmsService.get(id)
      .then((res) => {
        // console.log('view', res.data.pageInfo);
        setName(res.data.pageInfo.name);
        setSlug(res.data.pageInfo.slug);
        setContent(res.data.pageInfo.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.trim() === "") {
      setNameErr("Name cannot be empty");
    } else {
      setNameErr("");
    }
  };

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
    if (e.target.value.trim() === "") {
      setSlugErr("Slug cannot be empty");
    } else {
      setSlugErr("");
    }
  };

  const handleContentChange = (event) => {
    // console.log("change", event.editor.getData());
    setContent(event.editor.getData());
  };

  const setInitialData = (event) => {
    // console.log("event", event);
    // console.log("ready", event.editor.getData());

    cmsService.get(id)
    .then((res) => {
      // console.log('view', res.data.pageInfo);
      setName(res.data.pageInfo.name);
      setSlug(res.data.pageInfo.slug);
      event.editor.setData(res?.data?.pageInfo?.content);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const submitHandler = (e) => {
    e.preventDefault();

    let errorCount = 0;

    if (name.trim() === "") {
      setNameErr("Name cannot be empty");
      errorCount++;
    } else {
      setNameErr("");
    }

    if (slug.trim() === "") {
      setSlugErr("Slug cannot be empty");
      errorCount++;
    } else {
      setSlugErr("");
    }

    if (errorCount === 0) {
      let data = {
        name: name,
        slug: slug,
        content: content
      };
      console.log(data);
      dispatch(updateCms(id, data))
            .then((response) => {
              toast("CMS Updated successfully!", {
                transition: Slide,
    
                closeButton: true,
    
                autoClose: 3000,
    
                position: "top-right",
    
                type: "success", // info/success/warning/error
              });
              navigate("/cms/list");
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
    <Row>
      <Col md="12">
        <Card className="main-card mb-3">
          <Form onSubmit={submitHandler}>
            <CardBody>
              <Row>
                <Col md="12">
                  <FormGroup>
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name here..."
                      value={name}
                      onChange={handleNameChange}
                      invalid={nameErr !== ""}
                    />
                    {nameErr && <FormFeedback>{nameErr}</FormFeedback>}
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <FormGroup>
                  <Label for="slug">Slug</Label>
                  <Input
                    type="textarea"
                    name="slug"
                    id="slug"
                    placeholder="Slug here..."
                    value={slug}
                    onChange={handleSlugChange}
                    invalid={slugErr !== ""}
                  />
                  {slugErr && <FormFeedback>{slugErr}</FormFeedback>}
                </FormGroup>
              </Row>
              <Row>
                <FormGroup>
                  <Label for="content">Content</Label>
                  <CKEditor
                    name="content"
                    id="content"
                    initData={Parser(content)}
                    onChange={handleContentChange}
                    config={{ allowedContent: true }}
                    onInstanceReady={setInitialData}
                  />
                </FormGroup>
              </Row>
            </CardBody>
            <CardFooter className="d-block">
              <Button
                className="me-2"
                color="link"
                onClick={() => {
                  navigate(`/dashboard`);
                }}
              >
                Cancel
              </Button>
              <Button size="lg" color="primary" type="submit">
                Update
              </Button>
            </CardFooter>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default EditCms;

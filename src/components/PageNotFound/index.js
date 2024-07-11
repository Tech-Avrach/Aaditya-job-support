import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const PageNotFound = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <FaExclamationTriangle size={100} className="text-danger" />
          <h1 className="display-4">403</h1>
          <p className="lead">Oops! The page you are looking for does not exist.</p>
          <Link to="/">
            <Button color="primary">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PageNotFound;

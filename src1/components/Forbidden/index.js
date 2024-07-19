import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaBan } from 'react-icons/fa';


const ForbiddenPage = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <FaBan size={100} className="text-warning" />
          <h1 className="display-4">403</h1>
          <p className="lead">Sorry, you don't have permission to access this page.</p>
          <Link to="/">
            <Button color="primary">Go Home</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ForbiddenPage;

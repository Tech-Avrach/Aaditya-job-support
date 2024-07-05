
import React from "react";
import styles from "./styles/View.module.scss";
import { Col, Row, Card, CardBody } from "reactstrap";

function Chat({ conversations }) {
  console.log("con", conversations);

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${month} ${day}, ${year} at ${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div>
      {conversations ? (
        conversations.length > 0 ? (
          <Row>
            <Col md="12">
              <Card className="main-card mb-3 px-4" style={{ height: "80vh" }}>
                <CardBody>
                  <Row>
                    <Col md="3" className="mb-5">
                      <h6 className={styles.header}>Conversation</h6>
                    </Col>
                    {conversations.map((conversation, index) => (
                      <Col md="12" key={index}>
                        {conversation?.user?.firstName !== "Kapil" ? (
                          <Row>
                            <Col md="4">
                              <span style={{ fontWeight: "800", fontSize: "x-small", marginLeft: "10px" }}>
                                {conversation?.user?.firstName} {conversation?.user?.lastName}
                              </span>
                              <div style={{ background: "#f5f5f5", borderRadius: "10px", padding: "10px" }}>
                                <span>{conversation?.message}</span>
                                <br />
                              </div>
                              <span style={{ fontSize: "x-small", paddingTop: "10px", marginLeft: "10px" }}>
                                {formatDate(conversation.createdAt)}
                              </span>
                            </Col>
                            <Col md="8"></Col>
                          </Row>
                        ) : (
                          <Row>
                            <Col md="8"></Col>
                            <Col md="4">
                              <span style={{ fontWeight: "800", fontSize: "x-small", marginLeft: "10px" }}>
                                {conversation?.user?.firstName} {conversation?.user?.lastName}
                              </span>
                              <div style={{ background: "#f5f5f5", padding: "10px", borderRadius: "10px" }}>
                                <span>{conversation?.message}</span>
                              </div>
                              <span style={{ fontSize: "x-small", paddingTop: "10px", marginLeft: "10px" }}>
                                {formatDate(conversation.createdAt)}
                              </span>
                            </Col>
                          </Row>
                        )}
                      </Col>
                    ))}
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md="12">
              <Card className="main-card mb-3 px-4" style={{ height: "80vh" }}>
                <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Row style={{ width: '100%' }}>
                    <Col md="3" className="mb-5">
                      <h6 className={styles.header}>Conversation</h6>
                    </Col>
                  </Row>
                  <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ color: 'gray' }}>No Conversations</h1>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )
      ) : (
        <Row>
            <Col md="12">
              <Card className="main-card mb-3 px-4" style={{ height: "80vh" }}>
                <CardBody style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <Row style={{ width: '100%' }}>
                    <Col md="3" className="mb-5">
                      <h6 className={styles.header}>Conversation</h6>
                    </Col>
                  </Row>
                  <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1 style={{ color: 'gray' }}>Loading . . . .</h1>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
      )}
    </div>
  );
}

export default Chat;

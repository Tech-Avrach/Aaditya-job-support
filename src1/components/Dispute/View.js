import React, { useEffect, useState } from "react";
import styles from "./styles/View.module.scss";
import { Col, Row, Card, CardBody, CardFooter, Button } from "reactstrap";
import DisputeService from "../../redux/services/dispute";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import Chat from "./Chat";

export default function DisputeView(props) {
  const { id } = useParams();
  const [disputeDetails, setDisputeDetails] = useState({});
  const reservationDetail = props.reservationDetail;
  const navigate = useNavigate();

  let storageItems = "";

  if (reservationDetail?.ReservationItems?.length > 0) {
    for (const item of reservationDetail?.ReservationItems) {
      storageItems += item?.StorageItem.item + ", ";
    }
  }

  useEffect(() => {
    const getDisputeDetails = (disputeId) => {
      DisputeService.get(disputeId)
        .then((response) => {
          setDisputeDetails(response.data.disputeInfo);
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
    getDisputeDetails(id);
  }, [id]);

  return (
    <>
      <Row>
        <Col md="12">
          <Row>
            <Col md="3">
              <Card className="main-card mb-3" style={{height:"80vh"}}>
                <CardBody>
                  <Row>
                    <Col md="12" className="mb-3">
                      <h6 className={styles.header}>Dispute TransactionId</h6>
                      <p className={styles.subHeader}>
                        {disputeDetails?.transactionId}
                      </p>
                    </Col>
                    <Col md="12" className="mb-3">
                      <h6 className={styles.header}>Status</h6>
                      <p className={styles.subHeader}>
                        {disputeDetails?.status}
                      </p>
                    </Col>
                    <Col md="12" className="mb-3">
                      <h6 className={styles.header}>Created</h6>
                      <p className={styles.subHeader}>
                        {new Date(disputeDetails?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </Col>
                    <Col md="12" className="mb-4">
                      <h6 className={styles.header}>updatedAt</h6>
                      {disputeDetails?.updatedAt !== null
                        ? new Date(
                            disputeDetails?.updatedAt
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "--------------"}
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" className="mb-3">
                      <h6 className={styles.header}>Reason</h6>
                      <p className={styles.subHeader}>
                        {disputeDetails?.reason}
                      </p>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="d-block">
                  <Button
                    className="me-2"
                    color="link"
                    onClick={() => {
                      navigate(`/dispute/list`);
                    }}
                  >
                    Cancel
                  </Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="9">
              <Chat conversations={disputeDetails?.conversations}/>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

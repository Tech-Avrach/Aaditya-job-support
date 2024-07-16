import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Button,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Label,
} from "reactstrap";
import { toast } from "react-toastify";
import { format } from "date-fns";
import orderService from "../../redux/services/orders.service";
import PageContainer from "../Layout/PageContainer";

function SeeOrderInformation() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [orderInfo, setOrderInfo] = useState({});

    useEffect(() => {
        const fetchOrderInfo = async () => {
            try {
                const response = await orderService.get(id);
                setOrderInfo(response?.data?.orderInfo);
            } catch (error) {
                console.error("Error fetching order:", error);
                toast.error("Failed to fetch order information.");
            }
        };

        fetchOrderInfo();
    }, [id]);

    return (
        <PageContainer
            pageTitleIcon="pe-7s-cart icon-gradient bg-plum-plate"
            pageHeading="Orders"
            pageSubTitle="Listing all the orders on the system"
        >
            <Row>
                <Col md="12">
                    <Card className="main-card mb-3">
                        <CardBody>
                            <Row>
                                <Col md="12" style={{ paddingBottom: "10px" }}>
                                    <b style={{ fontSize: "20px", color: "#545cd8" }}>
                                        Order Info
                                    </b>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Public Id</b>
                                    </Label>
                                    <p>{orderInfo?.publicId ? orderInfo?.publicId : "N/A"}</p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Cart Sub Total</b>
                                    </Label>
                                    <p>
                                        {orderInfo?.cartSubTotal ? orderInfo?.cartSubTotal : "N/A"}
                                    </p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Total Service Charge</b>
                                    </Label>
                                    <p>
                                        {orderInfo?.totalServiceCharge
                                            ? orderInfo?.totalServiceCharge
                                            : "N/A"}
                                    </p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Payment Method</b>
                                    </Label>
                                    <p>
                                        {orderInfo?.payMethodId ? orderInfo?.payMethodId : "N/A"}
                                    </p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Payment Gateway Charge</b>
                                    </Label>
                                    <p>
                                        {orderInfo?.paymentGatewayCharge
                                            ? orderInfo?.paymentGatewayCharge
                                            : "N/A"}
                                    </p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Total Amount</b>
                                    </Label>
                                    <p>
                                        {orderInfo?.totalAmount ? orderInfo?.totalAmount : "N/A"}
                                    </p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Currency</b>
                                    </Label>
                                    <p>{orderInfo?.currency ? orderInfo?.currency : "N/A"}</p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Payment Status</b>
                                    </Label>
                                    <p>
                                        {orderInfo?.paymentStatus
                                            ? orderInfo?.paymentStatus
                                            : "N/A"}
                                    </p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Order Date</b>
                                    </Label>
                                    <p>
                                        {orderInfo?.createdAt
                                            ? format(new Date(orderInfo.createdAt), "PPpp")
                                            : "N/A"}
                                    </p>
                                </Col>
                                {orderInfo?.transaction?.length > 0 && (
                                    <Col md="12" style={{ paddingBottom: "10px" }}>
                                        <b style={{ fontSize: "20px", color: "#545cd8" }}>
                                            Transaction
                                        </b>
                                    </Col>
                                )}
                                {orderInfo?.orderItems?.length > 0 && (
                                    <>
                                        <Col md="12" style={{ paddingBottom: "10px" }}>
                                            <b style={{ fontSize: "20px", color: "#545cd8" }}>
                                                Order Items
                                            </b>
                                        </Col>
                                        {orderInfo.orderItems.map((item, index) => (
                                            <>
                                                <Col md="4">
                                                    <Label>
                                                        <b>Public Id</b>
                                                    </Label>
                                                    <p>{item?.publicId}</p>
                                                </Col>
                                                <Col md="8">
                                                    <Label>
                                                        <b>Delivery Status</b>
                                                    </Label>
                                                    <p>{item?.deliveryStatus}</p>
                                                </Col>
                                                {item?.cart && (
                                                    <>
                                                        <Col md="12" style={{ paddingBottom: "10px" }}>
                                                            <b style={{ fontSize: "20px", color: "#545cd8" }}>
                                                                Cart
                                                            </b>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Quantity</b>
                                                            </Label>
                                                            <p>{item?.cart?.quantity}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>IsTradetoSell</b>
                                                            </Label>
                                                            <p>{item?.cart?.isTradetoSell}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Insurance End At</b>
                                                            </Label>
                                                            <p>
                                                                {format(
                                                                    new Date(item?.cart?.insuranceEndAt),
                                                                    "PPpp"
                                                                )}
                                                            </p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Insurance</b>
                                                            </Label>
                                                            <p>{item?.cart?.insurance ? "Yes" : "No"}</p>
                                                        </Col>
                                                    </>
                                                )}
                                                {item?.cart?.ad && (
                                                    <>
                                                        <Col md="12" style={{ paddingBottom: "10px" }}>
                                                            <b
                                                                style={{
                                                                    fontSize: "20px",
                                                                    color: "#545cd8",
                                                                }}
                                                            >
                                                                Ad
                                                            </b>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Title</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.title}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Quantity</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.quantity}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Game Name</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.gameName}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Platform</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.platform}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Category</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.category}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Currency</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.currency}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Price</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.price}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Seller Id</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.sellerId}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Ad Image</b>
                                                            </Label>
                                                            <br />
                                                            <img
                                                                width={100}
                                                                src={item?.cart?.ad?.adImage[0].imageUrl}
                                                                alt="preview"
                                                                onError={
                                                                    `${process.env.REACT_APP_PROFILE_IMAGE_URL}` +
                                                                    `user.png`
                                                                }
                                                            />
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Trade Item</b>
                                                            </Label>
                                                            <p>
                                                                {item?.cart?.ad?.tradeItem
                                                                    ? item?.cart?.ad?.tradeItem
                                                                    : "N/A"}
                                                            </p>
                                                        </Col>
                                                    </>
                                                )}
                                                {item?.cart?.ad?.user && (
                                                    <>
                                                        <Col md="12" style={{ paddingBottom: "10px" }}>
                                                            <b
                                                                style={{
                                                                    fontSize: "20px",
                                                                    color: "#545cd8",
                                                                }}
                                                            >
                                                                User
                                                            </b>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>User Name</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.user?.username}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>First Name</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.user?.firstName}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Last Name</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.user?.lastName}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Profile Image</b>
                                                            </Label>
                                                            <br />
                                                            <img
                                                                width={100}
                                                                src={item?.cart?.ad?.user?.profileImage}
                                                                alt="preview"
                                                                onError={
                                                                    `${process.env.REACT_APP_PROFILE_IMAGE_URL}` +
                                                                    `user.png`
                                                                }
                                                            />
                                                        </Col>
                                                    </>
                                                )}
                                                {item?.cart?.ad?.seller && (
                                                    <>
                                                        <Col md="12" style={{ padding: "10px" }}>
                                                            <b
                                                                style={{
                                                                    fontSize: "20px",
                                                                    color: "#545cd8",
                                                                }}
                                                            >
                                                                seller
                                                            </b>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>National Id Number</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.seller?.nationalIdNumber}</p>
                                                        </Col>
                                                        <Col md="4">
                                                            <Label>
                                                                <b>Level</b>
                                                            </Label>
                                                            <p>{item?.cart?.ad?.seller?.level}</p>
                                                        </Col>
                                                    </>
                                                )}
                                            </>
                                        ))}
                                    </>
                                )}
                            </Row>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md="12" style={{ paddingBottom: "10px" }}>
                                    <b
                                        style={{
                                            fontSize: "20px",
                                            color: "#545cd8",
                                        }}
                                    >
                                        Buyer
                                    </b>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Buyer Id</b>
                                    </Label>
                                    <p>{orderInfo?.buyer?.id}</p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Buyer Public Id</b>
                                    </Label>
                                    <p>{orderInfo?.buyer?.publicId}</p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Buyer UserName</b>
                                    </Label>
                                    <p>{orderInfo?.buyer?.username}</p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Buyer First Name</b>
                                    </Label>
                                    <p>{orderInfo?.buyer?.firstName}</p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Buyer Last Name</b>
                                    </Label>
                                    <p>{orderInfo?.buyer?.lastName}</p>
                                </Col>
                                <Col md="4">
                                    <Label>
                                        <b>Buyer Profile Image</b>
                                    </Label>
                                    {orderInfo?.buyer?.profileImage === null ? (
                                        <p>N/A</p>
                                    ) : (
                                        <img
                                            width={100}
                                            src={
                                                orderInfo?.buyer?.profileImage != null
                                                    ? orderInfo?.buyer?.profileImage
                                                    : `${process.env.REACT_APP_PROFILE_IMAGE_URL}` +
                                                    `user.png`
                                            }
                                            alt="preview"
                                        />
                                    )}
                                </Col>
                            </Row>
                            <CardFooter className="d-block">
                                <Button
                                    className="me-2"
                                    color="link"
                                    onClick={() => navigate(`/order/list`)}
                                >
                                    Cancel
                                </Button>
                            </CardFooter>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </PageContainer>
    );
}

export default SeeOrderInformation;

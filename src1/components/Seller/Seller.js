import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageContainer from "../Layout/PageContainer";
import ProfileInformation from "./ProfileInformation";
import SellerService from "../../redux/services/seller.service";
toast.configure();

const User = (props) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [sellerDetail, setSellerDetail] = useState({});

  const handleSellerDetails = (data) => {
    setSellerDetail((prevState) => ({
      ...prevState,
      ...data,
      user: {
        ...prevState.user,
        ...data.user,
      },
    }));
  };
  useEffect(() => {
    if (!/\d+/.test(id)) {
      navigate(-1);
    }
  }, [id, navigate]);
  const getSeller = (id) => {
    SellerService.get(id)
      .then((response) => {
        setSellerDetail(response.data.sellerInfo);
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

  useEffect(() => {
    getSeller(id);
  }, [id]);

  return (
    <PageContainer
      pageTitleIcon="pe-7s-shopbag icon-gradient bg-plum-plate"
      pageHeading={"View Seller"}
      pageSubTitle={"View the profile information"}
    >
      {/* <Tabs defaultActiveKey="1" renderTabBar={() => <ScrollableInkTabBar />} renderTabContent={() => <TabContent />}>
                <TabPane tab="Profile Information" key="1" >
                    <ProfileInformation userDetail={userDetail} />
                </TabPane>
            </Tabs> */}
      <ProfileInformation
        handleSellerDetails={handleSellerDetails}
        sellerDetail={sellerDetail}
      />
    </PageContainer>
  );
};

export default User;

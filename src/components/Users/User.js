import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import PageContainer from "../Layout/PageContainer";
import ProfileInformation from "./ProfileInformation";
import UserService from "../../redux/services/user.service";
toast.configure();

const User = (props) => {

    const navigate = useNavigate();


    const { id } = useParams();

    const [userDetail, setUserDetail] = useState({});

    useEffect(() => {

        if (!/\d+/.test(id)) {

            navigate(-1);

        }
    }, [id, navigate]);
    const getUser = id => {

        UserService.get(id)
            .then(response => {

                setUserDetail(response.data.userInfo);

            })
            .catch(error => {

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

        getUser(id);

    }, [id]);


    return (
        <PageContainer
            pageTitleIcon="pe-7s-add-user icon-gradient bg-plum-plate"
            pageHeading={"Edit User"}
            pageSubTitle={"Edit the profile information"}
        >
            {/* <Tabs defaultActiveKey="1" renderTabBar={() => <ScrollableInkTabBar />} renderTabContent={() => <TabContent />}>
                <TabPane tab="Profile Information" key="1" >
                    <ProfileInformation userDetail={userDetail} />
                </TabPane>
            </Tabs> */}
            <ProfileInformation user={userDetail} />

        </PageContainer>
    );
}

export default User;

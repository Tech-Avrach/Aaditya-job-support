import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageContainer from "../Layout/PageContainer";
import RoleService from "../../redux/services/role.service";
import RoleInformation from "./RoleInformation";
toast.configure();

const ViewSingalRole = (props) => {
  const { id } = useParams();

  const [roleDetail, setRoleDetail] = useState({});

  useEffect(() => {
    const getRole = (id) => {
      RoleService.get(id)
        .then((response) => {
          setRoleDetail(response.data.pageInfo);
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

    getRole(id);
  }, [id]);

  return (
    <PageContainer
      pageTitleIcon="pe-7s-network icon-gradient bg-plum-plate"
      pageHeading={"View Role"}
      pageSubTitle={"View the role information"}
    >
      <RoleInformation roleDetail={roleDetail} />
    </PageContainer>
  );
};

export default ViewSingalRole;

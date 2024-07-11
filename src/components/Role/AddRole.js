import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageContainer from "../Layout/PageContainer";
import AddInformation from "./AddInformation";
import RoleList from "./RoleList";

toast.configure();

const Add = () => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-network icon-gradient bg-plum-plate"
      pageHeading={"Add New Role"}
      pageSubTitle={"Add the new role"}
    >
      <AddInformation />
      <RoleList />
    </PageContainer>
  );
};

export default Add;

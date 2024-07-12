import React from "react";
import PageContainer from "../Layout/PageContainer";
import AddUserInformation from "./AddUserInformation";

const AddUser = ({ user }) => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-add-user icon-gradient bg-plum-plate"
      pageHeading={"Add User"}
      pageSubTitle={"Add the User"}
    >
      <AddUserInformation  user={ user }/>
    </PageContainer>
  );
};

export default AddUser;

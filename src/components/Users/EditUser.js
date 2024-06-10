import React from "react";
import PageContainer from "../Layout/PageContainer";
import EditUserInformation from "./EditUserInformation";

const EditUser = (props) => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-user icon-gradient bg-plum-plate"
      pageHeading={"Edit User"}
      pageSubTitle={"Edit the User"}
    >
      <EditUserInformation  currentUser={props.currentUser}/>
    </PageContainer>
  )
}

export default EditUser
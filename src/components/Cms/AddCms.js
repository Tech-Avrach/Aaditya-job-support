import React from 'react'
import PageContainer from "../Layout/PageContainer";
import CreateCms from './CreateCms';

const AddCms = () => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-browser icon-gradient bg-plum-plate"
      pageHeading={"Add CMS"}
      pageSubTitle={"Add the Cms"}
    >
      <CreateCms />
    </PageContainer>
  )
}

export default AddCms
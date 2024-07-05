import React from 'react'
import PageContainer from "../Layout/PageContainer";
import CreateBanner from './CreateBanner';

const AddBanner = () => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-photo icon-gradient bg-plum-plate"
      pageHeading={"Add Banner"}
      pageSubTitle={"Add the Banner"}
    >
      <CreateBanner />
    </PageContainer>
  )
}

export default AddBanner
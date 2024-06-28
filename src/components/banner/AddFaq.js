import React from 'react'
import PageContainer from "../Layout/PageContainer";
import CreateBanner from './CreateFaq';

const AddBanner = () => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-display2 icon-gradient bg-plum-plate"
      pageHeading={"Add FAQ"}
      pageSubTitle={"Add the Faq"}
    >
      <CreateBanner />
    </PageContainer>
  )
}

export default AddBanner
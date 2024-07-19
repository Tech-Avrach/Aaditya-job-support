import React from 'react'
import PageContainer from "../Layout/PageContainer";
import CreateFaq from './CreateFaq';

const AddFaq = () => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-display2 icon-gradient bg-plum-plate"
      pageHeading={"Add FAQ"}
      pageSubTitle={"Add the Faq"}
    >
      <CreateFaq />
    </PageContainer>
  )
}

export default AddFaq
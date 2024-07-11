import React from 'react'
import PageContainer from "../Layout/PageContainer";
import CreateInsurance from './CreateInsurance';

const AddInsurance = () => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-display2 icon-gradient bg-plum-plate"
      pageHeading={"Add Insurance Plan"}
      pageSubTitle={"Add Insurance Plan"}
    >
      <CreateInsurance />
    </PageContainer>
  )
}

export default AddInsurance
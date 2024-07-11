import React from 'react'
import PageContainer from "../Layout/PageContainer";
import CreateBooster from './CreateBooster';

const AddBooster = () => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-rocket icon-gradient bg-plum-plate"
      pageHeading={"Add Booster Plan"}
      pageSubTitle={"Add the Booster Plan"}
    >
      <CreateBooster />
    </PageContainer>
  )
}

export default AddBooster
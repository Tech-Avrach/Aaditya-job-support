import React from 'react'
import PageContainer from "../Layout/PageContainer";
import AddRulesAndRegulations from './AddRulesAndRegulations';

const AddRules = () => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-display2 icon-gradient bg-plum-plate"
      pageHeading={"Add Rules"}
      pageSubTitle={"Add the Rules"}
    >
      <AddRulesAndRegulations />
    </PageContainer>
  )
}

export default AddRules
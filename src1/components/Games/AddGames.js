import React from "react";
import PageContainer from "../Layout/PageContainer";
import AddGamesInformation from "./AddGamesInformation";

const AddGames = () => {
  return (
    <PageContainer
      pageTitleIcon="pe-7s-display2 icon-gradient bg-plum-plate"
      pageHeading={"Add Game"}
      pageSubTitle={"Add the Game"}
    >
      <AddGamesInformation />
    </PageContainer>
  );
};

export default AddGames;

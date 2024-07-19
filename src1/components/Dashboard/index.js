import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  CardHeader,
  Container,
  Card,
  CardBody,
  Button
} from "reactstrap";
import Select from "react-select";
import DataTable from "react-data-table-component";

import PageContainer from "../Layout/PageContainer";
//import common filter component
import FilterComponent from "../../helpers/FilterComponent";
import debounceFunction from "../../helpers/Debounce";

//import report action
// import { retrieveHostReport, retrieveRenterReport, retrieveReservationReport, retrieveDraftListing } from "../../redux/actions/report";

function Dashboard() {

  return (
    <PageContainer
      pageTitleIcon="pe-7s-graph icon-gradient bg-plum-plate"
      pageHeading="Dashboard"
      pageSubTitle="Summary of the entire system"
    >
      <Container fluid>
        <Card className="mb-3">
          <CardHeader className="card-header-tab z-index-6">
            <div className="card-header-title font-size-lg text-capitalize fw-normal">
              <i className="header-icon lnr-charts icon-gradient bg-happy-green"> {" "} </i>
              Performance
            </div>
          </CardHeader>
        </Card>
      </Container>
    </PageContainer>
  );
}

export default Dashboard;
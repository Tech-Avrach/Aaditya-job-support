import React, { useState, useEffect, useMemo, useCallback } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, CardBody, Input, CardHeader } from "reactstrap";

import DataTable from "react-data-table-component";

import * as Ionicons from "react-icons/io";
import { toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

//import common page container
import PageContainer from "../Layout/PageContainer";

//import common filter component
import FilterComponent from "../../helpers/FilterComponent";

import debounceFunction from "../../helpers/Debounce";
import IconContainer from "../Common/IconContainer";
import { FaEye } from "react-icons/fa";
import {
  retrieveDispute,
  updateDisputeStatus,
} from "../../redux/actions/dispute";

toast.configure();

const All = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentUser = props.currentUser;

  const { dispute, totalDisputeCount: totalUsers } = useSelector(
    (state) => state.dispute
  );

  const [perPage, setPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  // const [totalRows, setTotalRows] = useState( totalUsers );

  const [filterText, setFilterText] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    dispatch(retrieveDispute());
  }, []);

  //status handler
  const handleStatusChange = (e, id, status) => {
    e.preventDefault();

    let data = {
      status: status,
    };

    let message = "Status Updated successfully!";

    // if (status === "pending") {
    //   message = "Status Updated  successfully!";
    // } else if (status === "resolved") {
    //   message = "Status Updated successfully!";
    // }

    //dispatch to update the status of the user
    // updateUserStatus(all, keyword, page, perPage, id, data)
    dispatch(updateDisputeStatus(id, data))
      .then((response) => {
        toast(message, {
          transition: Slide,
          closeButton: true,
          autoClose: 3000,
          position: "top-right",
          type: "success", // info/success/warning/error
        });
      })
      .catch((error) => {
        toast(error?.response?.data.message, {
          transition: Slide,
          closeButton: true,
          autoClose: 3000,
          position: "top-right",
          type: "error",
        });
      });
  };

  const handleViewClick = (row) => navigate(`/dispute/${row.publicId}`);
  // const handleViewClick = () => {};
  const columns = useMemo(
    () => [
      {
        name: "Unique ID",
        selector: (row) => row.publicId,
        sortable: true,
        width: "110px",
        headerStyle: () => ({ textAlign: "center" }),
      },
      {
        name: "Reason",
        selector: (row) => row.reason,
        sortable: true,
        headerStyle: () => ({ textAlign: "center" }),
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        width: "120px",
        headerStyle: () => ({ textAlign: "center" }),
      },
      {
        name: "Resolved At",
        selector: (row) => row.resolved_at,
        sortable: true,
        width: "180px",
        headerStyle: () => ({ textAlign: "center" }),
      },
      {
        name: "Actions",
        button: true,
        minWidth: "250px",
        headerStyle: () => ({ textAlign: "center" }),
        cell: (row) => (
          <>
            <IconContainer
              Icon={FaEye}
              handleOnClick={() => handleViewClick(row)}
              text="View"
            />

            <Input
              type="select"
              defaultValue={row.status}
              id="status"
              name="status"
              onChange={(e) =>
                handleStatusChange(e, row.publicId, e.target.value)
              }
              style={{ marginLeft: "10px", width: "50%" }}
            >
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </Input>
          </>
        ),
      },
    ],
    [handleViewClick]
  );

  const handlePageChange = (page) => {
    // dispatch(retrieveUsers(filterText, page, perPage));
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    // dispatch(retrieveUsers(filterText, page, newPerPage));
    setPerPage(newPerPage);
  };

  // Search
  const debounceSearch = useCallback(
    debounceFunction((nextValue) => {
      // dispatch(retrieveUsers(nextValue, 1, perPage));
    }, 1000),
    []
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        // dispatch(retrieveUsers(filterText, 1, perPage));
      }
    };

    return (
      <FilterComponent
        onFilter={(event) => {
          setFilterText(event.target.value);
          debounceSearch(event.target.value);
        }}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText]);

  return (
    <PageContainer
      pageTitleIcon="pe-7s-help2 icon-gradient bg-plum-plate"
      pageHeading="Dispute Resolution"
      pageSubTitle="Listing all the dispute  on the system"
    >
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <DataTable
                columns={columns}
                data={dispute}
                pagination
                // paginationPerPage="2"
                paginationServer
                paginationTotalRows={totalUsers}
                paginationDefaultPage={currentPage}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                // subHeader
                // x={subHeaderComponent}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default All;

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
  deleteDispute,
  restoreeDispute,
  retrieveDispute,
  updateDisputeStatus,
} from "../../redux/actions/dispute";
const RestoreIcon = Ionicons["IoIosRefresh"];
const DeleteIcon = Ionicons["IoIosTrash"];

toast.configure();

const All = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentUser = props.currentUser;

  const { dispute, totalDisputeCount: totalUsers } = useSelector(
    (state) => state.dispute
  );
  console.log(totalUsers);

  const { permissionMap: permissions } = useSelector((state) => state.auth);

  const currentModuleId = 7;

  const permission = permissions[currentModuleId];

  const [perPage, setPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  // const [totalRows, setTotalRows] = useState( totalUsers );

  const [filterText, setFilterText] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const param = {
    keyword: filterText,
    page: currentPage,
    perPage: perPage,
    all: true,
    active: false,
};

  useEffect(() => {
    dispatch(retrieveDispute(param));
  }, []);

  const fetchRules = useCallback(() => {
    dispatch(retrieveDispute(param));
}, [dispatch, filterText, currentPage, perPage]);

const handleDelete = (e, id, action) => {
  e.preventDefault();
  if (action === "delete") {
      let data = { all: "true", page: currentPage, perPage: perPage };
      dispatch(deleteDispute(id, data))
          .then((res) => {
              toast("Role deleted successfully!", {
                  transition: Slide,
                  closeButton: true,
                  autoClose: 3000,
                  position: "top-right",
                  type: "success",
              });
              // fetchRules();
          })
          .catch((error) => {
              console.log(error);
              toast(error.response?.data?.message || "An error occurred", {
                  transition: Slide,
                  closeButton: true,
                  autoClose: 3000,
                  position: "top-right",
                  type: "error",
              });
          });
  } else {
      dispatch(restoreeDispute(id, param))
          .then(() => {
              toast("Role restored successfully!", {
                  transition: Slide,
                  closeButton: true,
                  autoClose: 3000,
                  position: "top-right",
                  type: "success",
              });
              fetchRules();
          })
          .catch((error) => {
              toast(error.response?.data?.message || "An error occurred", {
                  transition: Slide,
                  closeButton: true,
                  autoClose: 3000,
                  position: "top-right",
                  type: "error",
              });
          });
  }
};

  //status handler
  const handleStatusChange = (e, id, status) => {
    e.preventDefault();

    let data = {
      status: status,
      all: "false",
      searchText: filterText,
      page: currentPage,
      perPage: perPage
    };  

    let message = "Status Updated successfully!";

    console.log(status)

    // if (status === "pending") {
    //   message = "Status Updated  successfully!";
    // } else if (status === "resolved") {
    //   message = "Status Updated successfully!";
    // }

    //dispatch to update the status of the user
    // updateUserStatus(all, keyword, page, perPage, id, data)
    //




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

  const columns = useMemo(() => {

    const commonColumns = [
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
    ];

    const renderActionCell = (row) => {
      const isDeleted = row.deletedAt && row.deletedAt !== null;
      if (isDeleted) {
          return permission?.delete ? (
              <IconContainer
                  id={"restore-icon"}
                  Icon={RestoreIcon}
                  handleOnClick={(e) => handleDelete(e, row.publicId, "restore")}
                  text={"Restore"}
                  iconColor={"#3ac47d"}
              />
          ) : null;
      }
      return (
        <>
          {permission.read ? (
            <IconContainer
            Icon={FaEye}
            handleOnClick={() => handleViewClick(row)}
            text="View"
          />
          ) : null }
          {permission.statusUpdate ? (
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
          ) : null}
          {permission?.delete ? (
                        <IconContainer
                            id={"delete-icon"}
                            Icon={DeleteIcon}
                            handleOnClick={(e) => handleDelete(e, row.publicId, "delete")}
                            text={"Delete"}
                            iconColor={"#d92550"}
                        />
                    ) : null}
        </>
      );
    };
  
  
    if (permission.read === 0 && permission.statusUpdate) {
      return commonColumns;
    }

    return [
      ...commonColumns,
      {
        name: "Actions",
        button: true,
        minWidth: "250px",
        headerStyle: { textAlign: "center" },
        cell: renderActionCell,
      },
    ];
  }, [permission, handleViewClick, handleStatusChange]);

  //
  

  const handlePageChange = (page) => {
    dispatch(retrieveDispute(filterText, page, perPage));
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(retrieveDispute(filterText, page, newPerPage));
    setPerPage(newPerPage);
  };

  // Search
  const debounceSearch = useCallback(
    debounceFunction((nextValue) => {
      dispatch(retrieveDispute(nextValue, 1, perPage));
    }, 1000),
    []
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        dispatch(retrieveDispute(filterText, 1, perPage));
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

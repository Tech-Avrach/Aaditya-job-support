import React, { useState, useEffect, useMemo, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, CardBody } from "reactstrap";

import DataTable from "react-data-table-component";

import * as Ionicons from "react-icons/io";
import { toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

//import common page container
import PageContainer from "../Layout/PageContainer";
import { Orders } from "../dummy/index";
//import users action
import {
  retrieveUsers,
  updateUserStatus,
  deleteUser,
  restoreUser,
} from "../../redux/actions/users";

//import common filter component
import FilterComponent from "../../helpers/FilterComponent";
import { FaEye } from "react-icons/fa";

import debounceFunction from "../../helpers/Debounce";
import IconContainer from "../Common/IconContainer";

const DeleteIcon = Ionicons["IoIosTrash"];

const RestoreIcon = Ionicons["IoIosRefresh"];
toast.configure();

const All = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [perPage, setPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [filterText, setFilterText] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const { permissionMap: permissions } = useSelector((state) => state.auth);

  const currentModuleId = 2;

  const permission = permissions[currentModuleId];

  useEffect(() => {
    dispatch(retrieveUsers(filterText, 1, perPage));
  }, []);

  //status handler
  const handleStatusChange = (e, id, status) => {
    e.preventDefault();

    let data = {
      isBlock: status,
    };

    let message = "";

    if (status === "0") {
      message = "User deactivated successfully!";
    } else if (status === "1") {
      message = "User activated successfully!";
    }
    //dispatch to update the status of the user
    dispatch(updateUserStatus(id, data))
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

  const handleViewClick = (row) => navigate(`/user/${row.publicId}`);

  //delete/restore handler
  const handleDelete = (e, id, action) => {
    e.preventDefault();
    if (action === "delete") {
      //dispatch to delete the user
      dispatch(deleteUser(id))
        .then((response) => {
          toast("User deleted successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
        })
        .catch((error) => {
          toast(error.response.data.message, {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "error",
          });
        });
    } else {
      //dispatch to restore the user
      dispatch(restoreUser(id))
        .then((response) => {
          toast("User restored successfully!", {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "success", // info/success/warning/error
          });
        })
        .catch((error) => {
          toast(error.response.data.message, {
            transition: Slide,

            closeButton: true,

            autoClose: 3000,

            position: "top-right",

            type: "error",
          });
        });
    }
  };

  const columns = useMemo(() => {
    const commonColumns = [
      {
        name: "Unique Id",
        selector: (row) => row.public_id,
        sortable: true,
        width: "110px",
        headerStyle: { textAlign: "center" },
      },
      {
        name: "Amount",
        selector: (row) => row.amount,
        sortable: true,
        headerStyle: { textAlign: "center" },
      },
      {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
        headerStyle: { textAlign: "center" },
      },
      {
        name: "Created At",
        selector: (row) => row.created_at,
        sortable: true,
        headerStyle: { textAlign: "center" },
      },
    ];

    const renderActionCell = (row) => {
      if (row.deletedAt === null) {
        return (
          <>
            {permission.update ? (
              <IconContainer
                Icon={FaEye}
                // handleOnClick={() => handleViewClick(row)}

                text="View"
              />
            ) : null}

            {permission.delete ? (
              <IconContainer
                id={row.deletedAt === null ? "delete-icon" : "restore-icon"}
                Icon={row.deletedAt === null ? DeleteIcon : RestoreIcon}
                // handleOnClick={(e) =>
                //   row.deletedAt === null
                //     ? handleDelete(e, row.publicId, "delete")
                //     : handleDelete(e, row.publicId, "restore")
                // }
                text={row.deletedAt === null ? "Delete" : "Restore"}
                iconColor={row.deletedAt === null ? "#d92550" : "#3ac47d"}
              />
            ) : null}
          </>
        );
      } else {
        return permission.delete ? (
          <IconContainer
            id={row.deletedAt === null ? "delete-icon" : "restore-icon"}
            Icon={row.deletedAt === null ? DeleteIcon : RestoreIcon}
            handleOnClick={(e) =>
              row.deletedAt === null
                ? handleDelete(e, row.publicId, "delete")
                : handleDelete(e, row.publicId, "restore")
            }
            text={row.deletedAt === null ? "Delete" : "Restore"}
            iconColor={row.deletedAt === null ? "#d92550" : "#3ac47d"}
          />
        ) : null;
      }
    };

    if (
      permission.delete === 0 &&
      permission.update === 0 &&
      permission.statusUpdate
    ) {
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
  }, [permission, handleViewClick, handleDelete, handleStatusChange]);
  //


  const handlePageChange = (page) => {
    dispatch(retrieveUsers(filterText, page, perPage));
    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(retrieveUsers(filterText, page, newPerPage));
    setPerPage(newPerPage);
  };

  // Search
  const debounceSearch = useCallback(
    debounceFunction((nextValue) => {
      dispatch(retrieveUsers(nextValue, 1, perPage));
    }, 1000),
    []
  );

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        dispatch(retrieveUsers(filterText, 1, perPage));
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
      pageTitleIcon="pe-7s-cart icon-gradient bg-plum-plate"
      pageHeading="Orders"
      pageSubTitle="Listing all the orders on the system"
    >
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <DataTable
                columns={columns}
                data={Orders}
                pagination
                // paginationPerPage="2"
                paginationServer
                paginationTotalRows={Orders.length}
                paginationDefaultPage={currentPage}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                subHeader
                subHeaderComponent={subHeaderComponent}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default All;

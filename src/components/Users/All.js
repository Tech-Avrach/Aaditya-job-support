
import React, { useState, useEffect, useMemo, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, CardBody, Input, CardHeader } from "reactstrap";

import DataTable from "react-data-table-component";

import * as Ionicons from "react-icons/io";
import { toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

//import common page container
import PageContainer from "../Layout/PageContainer";

//import users action
import {
  retrieveUsers,
  updateUserStatus,
  deleteUser,
  restoreUser,
} from "../../redux/actions/users";

//import common filter component
import FilterComponent from "../../helpers/FilterComponent";

import debounceFunction from "../../helpers/Debounce";
import IconContainer from "../Common/IconContainer";

const EditIcon = Ionicons["IoIosCreate"];
const DeleteIcon = Ionicons["IoIosTrash"];

const RestoreIcon = Ionicons["IoIosRefresh"];
const ActiveIcon = Ionicons["IoIosCheckmarkCircleOutline"];
const InactiveIcon = Ionicons["IoIosCloseCircle"];

toast.configure();

const All = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { users: filteredUsers, totalUserCount: totalUsers } = useSelector(
    (state) => state.user
  );

  const { permissionMap: permissions } = useSelector((state) => state.auth);

  const currentModuleId = 1;

  const permission = permissions.find(perm => perm.moduleId === currentModuleId);

  console.log(permission);

  const [perPage, setPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [filterText, setFilterText] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    dispatch(retrieveUsers(filterText, 1, perPage));
  }, []);

  const getData = (action) => {
    if(action === "delete" || action === "restore") {
      let data = {
        isBlock: "false",
        all:"true",
        page:currentPage,
        perPage:perPage,
        keyword:filterText,
      }
      return data;
    }
  }

  //status handler
  const handleStatusChange = (e, id, status) => {
    e.preventDefault();
    let data = {
      isBlock: status,
      all:"true",
      page:currentPage,
      perPage:perPage,
      keyword:filterText,
    }

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
    let data = getData(action);
    if (action === "delete") {
      //dispatch to delete the user
      dispatch(deleteUser(id, data))
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
      dispatch(restoreUser(id, data))
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
        selector: (row) => row.publicId,
        sortable: true,
        width: "110px",
        headerStyle: { textAlign: "center" },
      },
      {
        name: "Name",
        selector: (row) =>
          row.lastName !== null && row.lastName !== ""
            ? row.firstName + " " + row.lastName
            : row.firstName,
        sortable: true,
        headerStyle: { textAlign: "center" },
      },
      {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
        headerStyle: { textAlign: "center" },
      },
      {
        name: "Phone Number",
        selector: (row) => row.contactNumber,
        sortable: true,
        headerStyle: { textAlign: "center" },
      },
      {
        name: "Region",
        selector: (row) => row.region,
        sortable: true,
        headerStyle: { textAlign: "center" },
      },
    ];

    const renderActionCell = (row) => {
      const isDeleted = row.deletedAt && row.deletedAt !== null;
  
      if (isDeleted) {
        return permission.delete ? (
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
          {permission.update ? (
            <IconContainer
              id="edit-icon"
              Icon={EditIcon}
              handleOnClick={() => handleViewClick(row)}
              text="Edit"
            />
          ) : null }
          {permission.delete ? (
            <IconContainer
              id={"delete-icon"}
              Icon={DeleteIcon}
              handleOnClick={(e) => handleDelete(e, row.publicId, "delete")}
              text={"Delete"}
              iconColor={"#d92550"}
            />
          ) : null }
          {permission.statusUpdate ? (
            <IconContainer
            id={`active-deactivate-icon-${row.id}`}
            Icon={row.isBlock ? InactiveIcon : ActiveIcon}
            handleOnClick={(e) =>
              handleStatusChange(e, row.publicId, row.isBlock ? "0" : "1")
            }
            text={row.isBlock ? "Unblock" : "Block"}
            iconColor={row.isBlock ? "#d92550" : "#3ac47d"}
          />
          ) : null}
        </>
      );
    };
  
  
    if (permission.delete === 0 && permission.update === 0 && permission.statusUpdate) {
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
      pageTitleIcon="pe-7s-users icon-gradient bg-plum-plate"
      pageHeading="Users"
      pageSubTitle="Listing all the users on the system"
    >
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <DataTable
                columns={columns}
                data={filteredUsers}
                pagination
                // paginationPerPage="2"
                paginationServer
                paginationTotalRows={totalUsers}
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

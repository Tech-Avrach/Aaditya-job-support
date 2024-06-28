import React, { useState, useEffect, useMemo, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, CardBody } from "reactstrap";
import Select from "react-select";

import DataTable from "react-data-table-component";

import * as Ionicons from "react-icons/io";

import { toast, Slide } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

//import common page container
import PageContainer from "../Layout/PageContainer";

//import users action
import {
  retrieveSeller,
  updateSellerStatus,
  deleteSeller,
  restoreSeller,
} from "../../redux/actions/sellers";

//import common filter component
import FilterComponent from "../../helpers/FilterComponent";

import debounceFunction from "../../helpers/Debounce";

import IconContainer from "../Common/IconContainer";

import { FaEye } from "react-icons/fa";

import { FaTimesCircle } from "react-icons/fa";
const DeleteIcon = Ionicons["IoIosTrash"];

const RestoreIcon = Ionicons["IoIosRefresh"];
const ActiveIcon = Ionicons["IoIosCheckmarkCircleOutline"];
const InactiveIcon = Ionicons["IoIosCloseCircle"];

toast.configure();

const options = [
  { value: "", label: "All" },
  { value: false, label: "Pending" },
  { value: true, label: "Active" },
];

const All = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { sellers: filteredsellers, totalSellerCount: totalSellers } =
    useSelector((state) => state.seller);

  const { permissionMap: permissions } = useSelector((state) => state.auth);

    const currentModuleId = 2;
  
    const permission = permissions[currentModuleId];

  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "All",
  });

  const [perPage, setPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const [filterText, setFilterText] = useState("");

  const handleChange = (selecteValue) => {
    setSelectedOption(selecteValue);
  };

  useEffect(() => {
    if (selectedOption.label === "All") {
      dispatch(
        retrieveSeller(true, filterText, 1, perPage, selectedOption.value)
      );
    } else {
      dispatch(
        retrieveSeller(false, filterText, 1, perPage, selectedOption.value)
      );
    }
  }, [selectedOption]);

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const debounceSearch = useCallback(
    debounceFunction((nextValue) => {
      if (nextValue === "") {
        dispatch(
          retrieveSeller(true, nextValue, 1, perPage, selectedOption.value)
        );
      } else {
        dispatch(
          retrieveSeller(false, nextValue, 1, perPage, selectedOption.value)
        );
      }
    }, 1000),
    []
  );

  //subheader component of react-data-table
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        dispatch(
          retrieveSeller(true, filterText, 1, perPage, selectedOption.value)
        );
      }
    };

    return (
      <>
        <div className="d-flex w-100 justify-content-between ">
          <Select
            className="h-25  w-25"
            value={selectedOption}
            onChange={handleChange}
            options={options}
          />
          <FilterComponent
            onFilter={(event) => {
              setFilterText(event.target.value);
              debounceSearch(event.target.value);
            }}
            onClear={handleClear}
            filterText={filterText}
          />
        </div>
      </>
    );
  }, [filterText, resetPaginationToggle, selectedOption]);

  //status handler
  const handleStatusChange = (e, id, status) => {
    e.preventDefault();
    let data = {
      isBlock: status,
    };

    let message = "";

    if (status === 0) {
      message = "User activated successfully!";
    } else if (status === 1) {
      message = "User deactivated successfully!";
    }
    //dispatch to update the status of the Seller
    dispatch(updateSellerStatus(id, data))
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

  const handleViewClick = (row) => navigate(`/seller/${row?.publicId}`);

  //delete/restore handler
  const handleDelete = (e, id, action) => {
    e.preventDefault();
    if (action === "delete") {
      let data = { all: "true", page: currentPage, perPage: perPage };
      //dispatch to delete the user
      dispatch(deleteSeller(id, data))
        .then((response) => {
          toast("Seller deleted successfully!", {
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
      let data = { page: currentPage, perPage: perPage };
      //dispatch to restore the user
      dispatch(restoreSeller(id, data))
        .then((response) => {
          toast("Seller restored successfully!", {
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
        selector: (row) => row?.publicId,
        sortable: true,
        width: "110px",
        headerStyle: { textAlign: "center" },
      },
      {
        name: "Name",
        selector: (row) => `${row?.user?.firstName} ${row?.user?.lastName}`,
        sortable: true,
        headerStyle: { textAlign: "center" },
      },
      {
        name: "Email",
        selector: (row) => row?.user?.email,
        sortable: true,
        headerStyle: { textAlign: "center" },
      },
      {
        name: "Phone Number",
        selector: (row) => row.contactNumber,
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
            Icon={FaEye}
            handleOnClick={() => handleViewClick(row)}
            text="View"
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
            id={ `active-deactivate-icon-${row.id}`}
            Icon={row.isBlock ? InactiveIcon : ActiveIcon}
            handleOnClick={(e) =>
              row.isBlock
                ? handleStatusChange(e, row.publicId, 0)
                : handleStatusChange(e, row.publicId, 1)
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
    dispatch(
      retrieveSeller(true, filterText, page, perPage, selectedOption.value)
    );

    setCurrentPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(
      retrieveSeller(true, filterText, page, newPerPage, selectedOption.value)
    );
    setPerPage(newPerPage);
  };

  return (
    <PageContainer
      pageTitleIcon="pe-7s-shopbag icon-gradient bg-plum-plate"
      pageHeading="Sellers"
      pageSubTitle="Listing all the sellers on the system"
    >
      <Row>
        <Col md="12">
          <Card className="main-card mb-3 ">
            <CardBody>
              <DataTable
                columns={columns}
                data={filteredsellers}
                pagination
                // paginationPerPage = '25'
                paginationServer
                paginationTotalRows={totalSellers}
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

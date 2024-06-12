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
import { games } from "../dummy/index";
//import users action

//import common filter component
import FilterComponent from "../../helpers/FilterComponent";

import debounceFunction from "../../helpers/Debounce";
import IconContainer from "../Common/IconContainer";
import {
  retrieveGame,
  deleteGame,
  restoreGame,
} from "../../redux/actions/game";
import FilterModal from "./Filter";
const EditIcon = Ionicons["IoIosCreate"];
const DeleteIcon = Ionicons["IoIosTrash"];

const RestoreIcon = Ionicons["IoIosRefresh"];
toast.configure();

const All = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { games: filteredGames, totalGamesCount: totalGame } = useSelector(
    (state) => state.game
  );

  const [perPage, setPerPage] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // const [totalRows, setTotalRows] = useState( totalGame );

  const [filterText, setFilterText] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    dispatch(retrieveGame(filterText, 1, perPage));
  }, []);

  const handleViewClick = (row) => navigate(`/games/${row.publicId}`);

  //delete/restore handler
  const handleDelete = (e, id, action) => {
    e.preventDefault();
    let data = {
      currency: "INR",
      // "adType": "sell",
      // "status": "active",
      // "region": "US",
      // "platform": "PC",        //'PC', 'PS4', 'Xbox', 'Nintendo', 'PS5'
      category: "Game Item", // 'Game Item', 'Game Boosting/Coaching', 'Game Coins', 'Gift cards and Top up', 'Game account'
      // "minPrice": 10,
      // "maxPrice": 100,
      all: true, // true, false
      // "keyword": "RPG",
      page: currentPage,
      perPage: perPage,
      get: "list" //["list", "item"]
  }
    if (action === "delete") {
      //dispatch to delete the user
      dispatch(deleteGame(id, data))
        .then((response) => {
          toast("Game deleted successfully!", {
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
      dispatch(restoreGame(id, data))
        .then((response) => {
          toast("Game restored successfully!", {
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

  const columns = useMemo(
    () => [
      {
        name: "Unique Id",
        selector: (row) => row.publicId,
        sortable: true,
        width: "150px",
        headerStyle: {
          textAlign: "center",
        },
      },
      {
        name: "Game Name",
        selector: (row) => row.gameName,
        sortable: true,
        headerStyle: {
          textAlign: "center",
        },
      },
      {
        name: "Platform",
        selector: (row) => row.platform,
        sortable: true,
        headerStyle: {
          textAlign: "center",
        },
      },
      {
        name: "Region",
        selector: (row) => row.region,
        sortable: true,
        headerStyle: {
          textAlign: "center",
        },
      },

      {
        name: "Price",
        selector: (row) => `${row?.currency} ${row?.price}`,
        sortable: true,
        headerStyle: {
          textAlign: "center",
        },
      },

      {
        name: "Actions",
        button: true,
        // width: "218px",
        minWidth: "250px",
        headerStyle: (selector, id) => {
          return { textAlign: "center" };
        },
        cell: (row) =>
          row.deletedAt === null ? (
            <>
              <IconContainer
                id="edit-icon"
                Icon={EditIcon}
                handleOnClick={() => handleViewClick(row)}
                text="Edit"
              />
              <IconContainer
                id={"delete-icon"}
                Icon={DeleteIcon}
                handleOnClick={(e) => handleDelete(e, row.publicId, "delete")}
                text={"Delete"}
                iconColor={"#d92550"}
              />
            </>
          ) : (
            <IconContainer
              id={"restore-icon"}
              Icon={RestoreIcon}
              handleOnClick={(e) => handleDelete(e, row.publicId, "restore")}
              text={"Restore"}
              iconColor={"#3ac47d"}
            />
          ),
      },
    ],
    []
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
      dispatch(
        retrieveGame(
          nextValue,
          1,
          perPage,
          filterValues.platform,
          filterValues.category,
          filterValues.minPrice,
          filterValues.maxPrice,
          filterValues.currency,
          filterValues.adType,
          filterValues.status
        )
      );
    }, 1000),
    []
  );
  const handleOpenFilter = () => {
    setIsOpen(!isOpen);
  };

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        dispatch(
          retrieveGame(
            filterText,
            1,
            perPage,
            filterValues.platform,
            filterValues.category,
            filterValues.minPrice,
            filterValues.maxPrice,
            filterValues.currency,
            filterValues.adType,
            filterValues.status
          )
        );
      }
    };

    return (
      <>
        <div className="d-flex w-100 justify-content-between ">
          <button
            className="border-0 py-2 px-3 mx-5 mb-3 rounded"
            onClick={() => handleOpenFilter()}
          >
            Filter
          </button>
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
  }, [filterText, isOpen]);
  const [checkedRows, setCheckedRows] = useState({});

  const handleCheckboxChange = (rowId) => {
    setCheckedRows((prevState) => ({
      ...prevState,
      [rowId]: !prevState[rowId],
    }));
  };

  const [filterValues, setFilterValues] = useState({
    platform: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    currency: "",
    adType: "",
    status: "",
    region: "",
  });

  // Handle Filter Values
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // Reset Filter chek
  useEffect(() => {
    const keys = Object.keys(checkedRows);
    let newValue = {};
    keys.forEach((item) => {
      if (checkedRows[item] === false) {
        newValue[item] = "";
      }
    });
    setFilterValues((prev) => {
      return {
        ...prev,
        ...newValue,
      };
    });
  }, [checkedRows]);

  const handleAllFilter = () => {
    dispatch(
      retrieveGame(
        filterText,
        1,
        perPage,
        filterValues.platform,
        filterValues.category,
        filterValues.minPrice,
        filterValues.maxPrice,
        filterValues.currency,
        filterValues.adType,
        filterValues.status
      )
    );
  };
  return (
    <PageContainer
      pageTitleIcon="pe-7s-display2 icon-gradient bg-plum-plate"
      pageHeading="Games"
      pageSubTitle="Listing all the games on the system"
    >
      <FilterModal
        toggle={handleOpenFilter}
        Open={isOpen}
        filterValues={filterValues}
        handleFilterChange={handleFilterChange}
        handleAllFilter={handleAllFilter}
        checkedRows={checkedRows}
        handleCheckboxChange={handleCheckboxChange}
      />
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <DataTable
                columns={columns}
                data={filteredGames}
                pagination
                // paginationPerPage="2"
                paginationServer
                paginationTotalRows={totalGame}
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

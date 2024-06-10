import React, { useState, useEffect, useMemo, useCallback } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Row, Col, Card, CardBody, Input, CardHeader } from "reactstrap";

import DataTable from "react-data-table-component";

import * as Ionicons from "react-icons/io";
import { toast, Slide } from "react-toastify";
import Select from "react-select";

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

const IoMdEye = Ionicons["IoMdEye"];

const RestoreIcon = Ionicons["IoIosRefresh"];
toast.configure();

const All = (props) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState({
    value: "all",
    label: "All",
  });
  const currentUser = props.currentUser;
  
  const { users: filteredUsers, totalUserCount: totalUsers } = useSelector(
    (state) => state.user
  );

  const [perPage, setPerPage] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  // const [totalRows, setTotalRows] = useState( totalUsers );

  const [filterText, setFilterText] = useState("");

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

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

  const handleViewClick = (row) => navigate(`/adds/${row.public_id}`);

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

  const columns = useMemo(
    () => [
      {
        name: "Unique Id",
        selector: (row) => row.public_id,
        sortable: true,
        width: "150px",
        headerStyle: {
          textAlign: "center",
        },
      },
      {
        name: "Game Name",
        selector: (row) => row.game_name,
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
        name: "Price",
        selector: (row) => `$${row?.price?.toFixed(2)}`,
        sortable: true,
        headerStyle: {
          textAlign: "center",
        },
      },
      {
        name: "Actions",
        button: true,
        minWidth: "250px",
        headerStyle: {
          textAlign: "center",
        },
        cell: (row) => (
          <>
            <IconContainer
              id="view-icon"
              Icon={IoMdEye}
              handleOnClick={() => handleViewClick(row)}
              text="View"
            />
            {/* <IconContainer
              id="delete-icon"
              Icon={DeleteIcon}
              handleOnClick={(e) => handleDelete(e, row.public_id, "delete")}
              text="Delete"
              iconColor="#d92550"
            /> */}
          </>
        ),
      },
    ],
    [handleStatusChange, handleViewClick, handleDelete]
  );

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

  const handleChange = (_selectedOption) => {
    setSelectedOption(_selectedOption);
  };

  const options = [
    { value: "all", label: "All" },
    { value: "sold", label: "Sold" },
  ];

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
        dispatch(retrieveUsers(filterText, 1, perPage));
      }
    };

    return (
      <div className="btn-actions-pane-right text-capitalize">
        <span className="d-inline-block ms-2" style={{ width: 200 }}>
          <Select
            value={selectedOption}
            onChange={handleChange}
            options={options}
          />
        </span>
      </div>
    );
  });

  const ads = [
    {
      public_id: "550e8400-e29b-41d4-a716-446655440000",
      user_id: 1,
      game_name: "The Legend of Zelda: Breath of the Wild",
      platform: "Nintendo Switch",
      price: 59.99,
      description: "An open-world action-adventure game.",
      created_at: "2024-05-01 10:00:00",
    },
    {
      public_id: "550e8400-e29b-41d4-a716-446655440001",
      user_id: 2,
      game_name: "Cyberpunk 2077",
      platform: "PC",
      price: 49.99,
      description: "An open-world, action-adventure story set in Night City.",
      created_at: "2024-05-02 11:00:00",
    },
    {
      public_id: "550e8400-e29b-41d4-a716-446655440002",
      user_id: 3,
      game_name: "Final Fantasy VII Remake",
      platform: "PlayStation 4",
      price: 39.99,
      description: "A remake of the classic RPG game.",
      created_at: "2024-05-03 12:00:00",
    },
    {
      public_id: "550e8400-e29b-41d4-a716-446655440003",
      user_id: 1,
      game_name: "Halo Infinite",
      platform: "Xbox Series X",
      price: 59.99,
      description: "The next chapter in the Halo series.",
      created_at: "2024-05-04 13:00:00",
    },
    {
      public_id: "550e8400-e29b-41d4-a716-446655440004",
      user_id: 4,
      game_name: "Animal Crossing: New Horizons",
      platform: "Nintendo Switch",
      price: 49.99,
      description:
        "A life simulation game where you develop a deserted island.",
      created_at: "2024-05-05 14:00:00",
    },
    {
      public_id: "550e8400-e29b-41d4-a716-446655440005",
      user_id: 5,
      game_name: "The Witcher 3: Wild Hunt",
      platform: "PC",
      price: 29.99,
      description:
        "An open-world RPG set in a visually stunning fantasy universe.",
      created_at: "2024-05-06 15:00:00",
    },
    {
      public_id: "550e8400-e29b-41d4-a716-446655440006",
      user_id: 3,
      game_name: "Red Dead Redemption 2",
      platform: "PlayStation 4",
      price: 39.99,
      description: "An epic tale of life in America’s unforgiving heartland.",
      created_at: "2024-05-07 16:00:00",
    },
    {
      public_id: "550e8400-e29b-41d4-a716-446655440007",
      user_id: 2,
      game_name: "Minecraft",
      platform: "PC",
      price: 19.99,
      description: "A game about placing blocks and going on adventures.",
      created_at: "2024-05-08 17:00:00",
    },
    {
      public_id: "550e8400-e29b-41d4-a716-446655440008",
      user_id: 4,
      game_name: "Super Mario Odyssey",
      platform: "Nintendo Switch",
      price: 49.99,
      description: "Mario embarks on a new journey through unknown worlds.",
      created_at: "2024-05-09 18:00:00",
    },
    {
      public_id: "550e8400-e29b-41d4-a716-446655440009",
      user_id: 5,
      game_name: "Among Us",
      platform: "PC",
      price: 4.99,
      description: "A multiplayer game of teamwork and betrayal.",
      created_at: "2024-05-10 19:00:00",
    },
  ];

  return (
    <PageContainer
      pageTitleIcon="pe-7s-magic-wand icon-gradient bg-plum-plate"
      pageHeading="Adds"
      pageSubTitle="Listing all the adds on the system"
    >
      <Row>
        <Col md="12">
          <Card className="main-card mb-3">
            <CardBody>
              <DataTable
                columns={columns}
                data={ads}
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

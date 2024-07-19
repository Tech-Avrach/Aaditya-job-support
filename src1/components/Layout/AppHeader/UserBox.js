import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Button,
  NavItem,
  NavLink,
  UncontrolledButtonDropdown,
} from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
//import users action
// import { retrieveLoggedInUser } from "../../../redux/actions/users";
//import logout action
import { logout } from "../../../redux/actions/auth";
//import event bus
import EventBus from "../../../common/EventBus";
import { Link } from "react-router-dom";

const UserBox = (props) => {
  const dispatch = useDispatch();

  const authDetails = props.authDetails;
  const id = authDetails?.publicId;

  const [currentUser, setCurrentUser] = useState(authDetails);

  const { user: userInfo } = useSelector((state) => state.auth);

  const [avatar, setAvatar] = useState("");

  // useEffect(() => {
  //   // dispatch(retrieveLoggedInUser(id));
  // }, [id]);

  useEffect(() => {
    if (
      authDetails &&
      authDetails.expiry &&
      new Date().getTime() > authDetails.expiry
    )
      logOut();
  }, [authDetails]);

  useEffect(() => {
    if (userInfo !== undefined) setCurrentUser(userInfo);
  }, [userInfo]);

  useEffect(() => {
    //set profile image preview when userDetail changes
    if (currentUser?.profileImage) {
      setAvatar(currentUser?.profileImage);
    }
  }, [currentUser]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  return (
    <>
      <div className="header-btn-lg pe-0">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
              <UncontrolledButtonDropdown>
                <DropdownToggle color="link" className="p-0">
                  <img
                    width={42}
                    className="rounded-circle"
                    src={avatar}
                    alt=""
                  />
                  <FontAwesomeIcon
                    className="ms-2 opacity-8"
                    icon={faAngleDown}
                  />
                </DropdownToggle>
                <DropdownMenu end className="rm-pointers dropdown-menu-lg">
                  <div className="dropdown-menu-header">
                    <div className="dropdown-menu-header-inner bg-info">
                      <div className="menu-header-image opacity-2" />
                      <div className="menu-header-content text-start">
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left me-3">
                              <img
                                width={42}
                                className="rounded-circle"
                                src={avatar}
                                alt=""
                              />
                            </div>
                            <div className="widget-content-left">
                              <div className="widget-heading">
                                {currentUser && currentUser.lastName !== null
                                  ? currentUser?.firstName +
                                    " " +
                                    currentUser?.lastName
                                  : currentUser?.firstName}
                              </div>
                              <div className="widget-subheading opacity-8">
                                {currentUser ? currentUser.email : ""}
                              </div>
                            </div>
                            <div className="widget-content-right me-2">
                              <Button
                                className="btn-pill btn-shadow btn-shine"
                                color="focus"
                                onClick={logOut}
                              >
                                Logout
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="scroll-area-xs"
                    style={{
                      height: "35px",
                    }}
                  >
                    <PerfectScrollbar>
                      <Nav vertical>
                        <NavItem>
                          {/* href="/profile" */}
                          <NavLink tag={Link} to="/user/edit">Edit My Profile</NavLink>
                        </NavItem>
                      </Nav>
                    </PerfectScrollbar>
                  </div>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserBox;

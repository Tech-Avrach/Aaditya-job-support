import React, { useState } from "react";
import { connect } from "react-redux";

import { Slider } from "react-burgers";

import cx from "classnames";

import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button } from "reactstrap";

import {
  setEnableMobileMenu,
  setEnableMobileMenuSmall,
} from "../../../redux/reducers/ThemeOptions";

function AppMobileMenu(props) {
  const [active, setActive] = useState(false);
  const [activeSecondaryMenuMobile, setActiveSecondaryMenuMobile] = useState(
    false
  );

  const toggleMobileSidebar = () => {
    const { enableMobileMenu, setEnableMobileMenu } = props;
    setEnableMobileMenu(!enableMobileMenu);
  };

  const toggleMobileSmall = () => {
    const { enableMobileMenuSmall, setEnableMobileMenuSmall } = props;
    setEnableMobileMenuSmall(!enableMobileMenuSmall);
  };

  return (
    <>
      <div className="app-header__mobile-menu">
        <div onClick={toggleMobileSidebar}>
          <Slider
            width={26}
            lineHeight={2}
            lineSpacing={5}
            color="#6c757d"
            active={active}
            onClick={() => setActive(!active)}
          />
        </div>
      </div>
      <div className="app-header__menu">
        <span onClick={toggleMobileSmall}>
          <Button
            size="sm"
            className={cx("btn-icon btn-icon-only", {
              active: activeSecondaryMenuMobile,
            })}
            color="primary"
            onClick={() =>
              setActiveSecondaryMenuMobile(!activeSecondaryMenuMobile)
            }
          >
            <div className="btn-icon-wrapper">
              <FontAwesomeIcon icon={faEllipsisV} />
            </div>
          </Button>
        </span>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  closedSmallerSidebar: state.ThemeOptions.closedSmallerSidebar,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
  setEnableMobileMenuSmall: (enable) =>
    dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppMobileMenu);
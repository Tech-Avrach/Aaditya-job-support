import React, { useState } from "react";
import { connect } from "react-redux";

import { Slider } from "react-burgers";

import AppMobileMenu from "../AppMobileMenu";

import {
  setEnableClosedSidebar,
  setEnableMobileMenu,
  setEnableMobileMenuSmall,
} from "../../../redux/reducers/ThemeOptions";

function HeaderLogo(props) {
  const [active, setActive] = useState(false);

  const toggleEnableClosedSidebar = () => {
    const { enableClosedSidebar, setEnableClosedSidebar } = props;
    setEnableClosedSidebar(!enableClosedSidebar);
  };

  return (
    <>
      <div className="app-header__logo">
        {/* <div className="logo-src" /> */}
        <div className="header__pane ms-auto">
          <div onClick={toggleEnableClosedSidebar}>
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
      </div>
      <AppMobileMenu />
    </>
  );
}

const mapStateToProps = (state) => ({
  enableClosedSidebar: state.ThemeOptions.enableClosedSidebar,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  enableMobileMenuSmall: state.ThemeOptions.enableMobileMenuSmall,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableClosedSidebar: (enable) => dispatch(setEnableClosedSidebar(enable)),
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
  setEnableMobileMenuSmall: (enable) =>
    dispatch(setEnableMobileMenuSmall(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLogo);
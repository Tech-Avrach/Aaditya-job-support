import React from "react";
import { connect } from "react-redux";
import cx from "classnames";

import Nav from "../AppNav/";

import { CSSTransition, TransitionGroup } from "react-transition-group";

import PerfectScrollbar from "react-perfect-scrollbar";
import HeaderLogo from "../AppLogo";

import { setEnableMobileMenu } from "../../../redux/reducers/ThemeOptions";

function AppSidebar(props) {
  const {
    backgroundColor,
    enableBackgroundImage,
    enableSidebarShadow,
    backgroundImage,
    backgroundImageOpacity,
    enableMobileMenu,
    setEnableMobileMenu,
    permission,
  } = props;

  const toggleMobileSidebar = () => {
    setEnableMobileMenu(!enableMobileMenu);
  };

  return (
    <>
      <div className="sidebar-mobile-overlay" onClick={toggleMobileSidebar} />
      <TransitionGroup>
        <CSSTransition
          component="div"
          className={cx("app-sidebar", backgroundColor, {
            "sidebar-shadow": enableSidebarShadow,
          })}
          appear={true}
          enter={false}
          exit={false}
          timeout={500}
        >
          <div>
            <HeaderLogo />
            <PerfectScrollbar>
              <div className="app-sidebar__inner">
                <Nav permission={permission}/>
              </div>
            </PerfectScrollbar>
            <div
              className={cx("app-sidebar-bg", backgroundImageOpacity)}
              style={{
                backgroundImage: enableBackgroundImage
                  ? "url(" + backgroundImage + ")"
                  : null,
              }}
            />
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

const mapStateToProps = (state) => ({
  enableBackgroundImage: state.ThemeOptions.enableBackgroundImage,
  enableSidebarShadow: state.ThemeOptions.enableSidebarShadow,
  enableMobileMenu: state.ThemeOptions.enableMobileMenu,
  backgroundColor: state.ThemeOptions.backgroundColor,
  backgroundImage: state.ThemeOptions.backgroundImage,
  backgroundImageOpacity: state.ThemeOptions.backgroundImageOpacity,
});

const mapDispatchToProps = (dispatch) => ({
  setEnableMobileMenu: (enable) => dispatch(setEnableMobileMenu(enable)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppSidebar);
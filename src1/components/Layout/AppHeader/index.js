import React from "react";

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import HeaderLogo from "../AppLogo";

import UserBox from "./UserBox";

const Header = (props) => {

    const authDetails= props.authDetails;

    return (
      <>
        <TransitionGroup>
          <CSSTransition component="div"
            className="app-header header-shadow"
            appear={true} timeout={1500} enter={false} exit={false}>
            <div>
              <HeaderLogo />
              <div className="app-header__content">
                <div className="app-header-right">
                  <UserBox authDetails={authDetails} />
                </div>
              </div>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </>
    );
}

export default Header;

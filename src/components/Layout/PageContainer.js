import React from "react";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const PageContainer = (props) => {

    return (
        <TransitionGroup>
            <CSSTransition component="div" classNames="TabsAnimation" appear={true}
              timeout={1500} enter={false} exit={false}>
                <div>
                  <div className="app-page-title">
                    <div className="page-title-wrapper">
                      <div className="page-title-heading">
                        <div className="page-title-icon">
                          <i className={props.pageTitleIcon} />
                        </div>
                        <div>
                          {props.pageHeading}
                          <div className="page-title-subheading">
                            {props.pageSubTitle}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {props.children}
                </div>
            </CSSTransition>
        </TransitionGroup>
    );
}

export default PageContainer;
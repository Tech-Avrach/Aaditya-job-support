import { Fragment } from "react";
import { useSelector } from "react-redux";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";

const Layout = (props) => {

    const { user: authDetails } = useSelector((state) => state.auth);
    
    return (
        <Fragment>
        <AppHeader authDetails={authDetails} />
            <div className="app-main">
                <AppSidebar authDetails={authDetails} />
                <div className="app-main__outer">
                    <div className="app-main__inner">
                        {props.children}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Layout;
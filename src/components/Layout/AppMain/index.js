import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearMessage } from "../../../redux/actions/message";

import SuperAdminCheck from "../../../routes/SuperAdminCheck";
import ProtectedRoutes from "../../../routes/ProtectedRoutes";
import PublicRoutes from "../../../routes/PublicRoutes";
import useTokenRefreshHook from "../../../hooks/getRefreshhook";
import { handleRefreshTokenHelper } from "../../../hooks/refreshHelper";
import AddFaq from "../../faq/AddFaq";
import EditFaq from "../../faq/EditFaq";
import FaqList from "../../faq/All";
import BannerList from "../../banner/All";
import CreateBanner from "../../banner/CreateBanner";
import EditBanner from "../../banner/EditBanner";
import AddBanner from "../../banner/AddBanner";

const Login = lazy(() => import("../../Login/"));
const Dashboard = lazy(() => import("../../Dashboard/"));
const ForgotPassword = lazy(() => import("../../ForgotPassword/"));
const ResetPassword = lazy(() => import("../../ResetPassword/"));
const UserList = lazy(() => import("../../Users/All"));
const AddUser = lazy(() => import("../../Users/AddUser"));
const User = lazy(() => import("../../Users/User"));
const EditUser = lazy(() => import("../../Users/EditUser"));

const SellerList = lazy(() => import("../../Seller/All"));
const Seller = lazy(() => import("../../Seller/Seller"));

const OrderList = lazy(() => import("../../Orders/All"));

const GamesList = lazy(() => import("../../Games/All"));
const AddGame = lazy(() => import("../../Games/AddGames"));
const GamesInformation = lazy(() => import("../../Games/SeeGamesInformation"));

const DisputeList = lazy(() => import("../../Dispute/All"));
const AddDispute = lazy(() => import("../../Dispute/Add"));
const DisputeView = lazy(() => import("../../Dispute/View"));

const AddRole = lazy(() => import("../../Role/AddRole"));
const Permissions = lazy(() => import("../../Role/All"));
const ViewSingalRole = lazy(() => import("../../Role/ViewSingal"));

const AddRules = lazy(() => import("./../../RulesAndRegulations/AddRules"));
const RulesList = lazy(() => import("./../../RulesAndRegulations/All"));
const EditRules = lazy(() => import("./../../RulesAndRegulations/EditRules"));

const AddInsurance = lazy(() => import("./../../insurancePlan/AddInsurance"));
const InsuranceList = lazy(() => import("./../../insurancePlan/All"));
const EditInsurance = lazy(() => import("./../../insurancePlan/EditInsurance"));

const PageNotFound = lazy(() => import("../../PageNotFound"));
const ForbiddenPage = lazy(()=> import ("../../Forbidden"))

const AppMain = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const { user: currentUser } = useSelector((state) => state.auth);
  // useEffect(() => {
  //   currentUser ? setIsLoggedIn(true) : setIsLoggedIn(false);
  // }, [currentUser]);

  const { user: isLoggedIn, user: currentUser } = useSelector(
    (state) => state.auth
  );
  useTokenRefreshHook();

  const dispatch = useDispatch();

  let location = useLocation();

  useEffect(() => {
    if (["/login"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }

    const _expire = JSON.parse(localStorage.getItem("_expire"));
    if (+_expire < 5) {
      setTimeout(() => {
        handleRefreshTokenHelper();
      }, [1000 * 60 * 2]);
    }
  }, [dispatch, location]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="user">
          <Route path="list" element={<UserList currentUser={currentUser} />} />
          <Route path="add" element={<AddUser currentUser={currentUser} />} />
          <Route path="edit" element={<EditUser currentUser={currentUser}/>} />
          <Route path=":id" element={<User currentUser={currentUser} />} />
        </Route>
        <Route path="seller">
          <Route
            path="list"
            element={<SellerList currentUser={currentUser} />}
          />
          <Route path=":id" element={<Seller currentUser={currentUser} />} />
        </Route>
        <Route path="order">
          <Route
            path="list"
            element={<OrderList currentUser={currentUser} />}
          />
        </Route>
        <Route path="games">
          <Route path="add" element={<AddGame currentUser={currentUser} />} />
          <Route
            path="list"
            element={<GamesList currentUser={currentUser} />}
          />
          <Route
            path=":id"
            element={<GamesInformation currentUser={currentUser} />}
          />
        </Route>
        <Route path="dispute">
          <Route
            path="list"
            element={<DisputeList currentUser={currentUser} />}
          />
          <Route
            path="add"
            element={<AddDispute currentUser={currentUser} />}
          />
          <Route path=":id" element={<DisputeView />} />
        </Route>

        <Route path="role" element={<SuperAdminCheck currentUser={currentUser} />}>
          <Route path="list" element={<AddRole currentUser={currentUser} />} />
          <Route path="permission" element={<Permissions />} />
          <Route path=":id" element={<ViewSingalRole />} />
        </Route>
        <Route path="faq">
          <Route path="list" element={<FaqList currentUser={currentUser} />} />
          <Route path="add" element={<AddFaq currentUser={currentUser} />} />
          <Route path=":id" element={<EditFaq currentUser={currentUser} />} />
        </Route>
        <Route path="banner">
          <Route path="list" element={<BannerList currentUser={currentUser} />} />
          <Route path="add" element={<AddBanner currentUser={currentUser} />} />
          <Route path=":id" element={<EditBanner currentUser={currentUser} />} />
        </Route>

        <Route path="rules">
          <Route path="list" element={<RulesList currentUser={currentUser} />} />
          <Route path="add" element={<AddRules currentUser={currentUser} />} />
          <Route path=":id" element={<EditRules currentUser={currentUser} />} />
        </Route>

        <Route path="insurance">
          <Route path="list" element={<InsuranceList currentUser={currentUser} />} />
          <Route path="add" element={<AddInsurance currentUser={currentUser} />} />
          <Route path=":id" element={<EditInsurance currentUser={currentUser} />} />
        </Route>
      </Route>    
        

      <Route element={<PublicRoutes isLoggedIn={isLoggedIn} />}>
        <Route path="login" element={<Login />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />
      </Route>

      <Route path="forbidden" element={<ForbiddenPage/>} />
      <Route path="*" element={<PageNotFound/>} />

    </Routes>
    </Suspense>
  );
};

export default AppMain;

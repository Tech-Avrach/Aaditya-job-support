import React, { Suspense } from "react";

import { Navigate, Outlet } from "react-router-dom";

import Loader from "react-loaders";

import Layout from "../components/Layout";

const ProtectedRoutes = ({ isLoggedIn }) => {
  return isLoggedIn ? (
    <Layout>
      <Suspense
        fallback={
          <div
            className="loader-container"
            style={{ width: "75vw", height: "75vh" }}
          >
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="ball-pulse-rise" />
              </div>
              <h6 className="mt-5">Please wait...</h6>
            </div>
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoutes;

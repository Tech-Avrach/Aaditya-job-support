import React, { Suspense } from "react";

import Loader from "react-loaders";

import { Navigate, Outlet } from "react-router-dom";

const AnonymousRoutes = ({ isLoggedIn }) => {
  return isLoggedIn ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Suspense
      fallback={
        <div className="loader-container">
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
  );
};

export default AnonymousRoutes;

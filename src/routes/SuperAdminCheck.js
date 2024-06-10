import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const SuperAdminCheck = ({currentUser}) => {

    if(currentUser?.permission[0]?.roleId !== 1) return <Navigate to={"/forbidden"} />

  return (
    <Outlet />
  )
}

export default SuperAdminCheck

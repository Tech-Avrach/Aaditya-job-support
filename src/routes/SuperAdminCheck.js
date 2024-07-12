import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const SuperAdminCheck = ({currentUser}) => {

    console.log("current user super",currentUser[0]?.roleId)
    if(currentUser[0]?.roleId !== 1) return <Navigate to={"/forbidden"} />

  return (
    <Outlet />
  )
}

export default SuperAdminCheck
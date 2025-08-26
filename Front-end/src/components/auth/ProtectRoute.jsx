import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectRoute = ({children,user,redirectTo="/login"}) => {
  if (!user) {
    return <Navigate to={redirectTo} />
  }
  return children ? children : <Outlet/>
}

export default ProtectRoute
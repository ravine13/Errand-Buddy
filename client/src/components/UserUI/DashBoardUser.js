import React from 'react'
import HeaderUser from './HeaderUser'
import SideNavUser from './SideNavUser'
import FooterUser from './FooterUser'
import { Outlet } from 'react-router-dom'

const DashBoardUser = () => {
  return (
    <div>
        <HeaderUser />
        <Outlet />
        <SideNavUser />
        <FooterUser />
      
    </div>
  )
}

export default DashBoardUser

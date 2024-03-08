import React from 'react'
import HeaderAdmin from './HeaderAdmin'
import HomeHr from './HomeHr'
import FooterAdmin from './FooterAdmin'
import SideNavAdmin from './SideNavAdmin'
import { Outlet } from 'react-router-dom'

const DashBoardAdmin = () => {
  return (
    <div>
        <HeaderAdmin/>
        <Outlet/>
        <SideNavAdmin />
        <FooterAdmin/>
      
    </div>
  )
}

export default DashBoardAdmin;
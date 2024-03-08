import React from 'react'
import HeaderAdmin from './HeaderAdmin'
import FooterAdmin from './FooterAdmin'
import SideNavAdmin from './SideNavAdmin'
import { Outlet } from 'react-router-dom'

const DashboardAdmin = () => {
  return (
    <div>
        <HeaderAdmin />
        <Outlet/>
        <SideNavAdmin />
        <FooterAdmin/>
      
    </div>
  )
}

export default DashboardAdmin;
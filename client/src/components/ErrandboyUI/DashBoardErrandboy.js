import React from 'react'
import HeaderErrandboy from './HeaderErrandboy'
import SideNavErrandboy from './SideNavErrandboy'
import FooterErrandboy from './FooterErrandboy'
import { Outlet } from 'react-router-dom'

const DashBoardErrandboy = () => {
  return (
    <div>
        <HeaderErrandboy />
        <Outlet />
        <SideNavErrandboy />
        <FooterErrandboy />
    </div>
  )
}

export default DashBoardErrandboy;

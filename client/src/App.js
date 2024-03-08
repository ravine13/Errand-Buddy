import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import Login from "./components/Login";

import DashBoardAdmin from "./components/AdminUI/DashBoardAdmin";
import Profile from "./components/AdminUI/Profile";
import CreateProfile from "./components/AdminUI/CreateProfile";
import EditProfile from "./components/AdminUI/EditProfile";
import ViewManagers from "./components/AdminUI/ViewManagers";

import DashBoardEmployee from "./components/employeeUI/DashBoardEmployee";
import EmployeeProfileForm from "./components/employeeUI/EmployeeProfileForm";
import EmployeeProfile from "./components/employeeUI/EmployeeProfile";
import EditProfileForm from "./components/employeeUI/EditProfileForm";

import DashBoardManager from "./components/managerUI/DashBoardManager";
import ManagerEditProfile from './components/managerUI/ManagerEditProfile';
import ManagerCreateProfile from './components/managerUI/ManagerCreateProfile'

import ResetPassword from './components/ResetPassword';
import ChangePassword from "./components/ChangePassword";
import ManagerProfile from "./components/managerUI/ManagerProfile";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/employee" element={<DashBoardEmployee />}>
        <Route path="/employee/profile" element={<EmployeeProfile/>} />
        <Route path="/employee/profile/create" element={<EmployeeProfileForm />} />
        <Route path="/employee/profile/edit" element={<EditProfileForm />} />

       </Route>

        <Route path="/admin" element={<DashBoardAdmin />} >
        <Route path="/admin/hr_profile" element={<Profile />}/>
        <Route path="/admin/create_profile" element={<CreateProfile/>}/>
        <Route path="/admin/edit_profile" element={<EditProfile/>}/>
        <Route path="/admin/view_managers" element={<ViewManagers />} />
        
        </Route>

        <Route path="/manager" element={<DashBoardManager />} >
        <Route path="/manager/manager_profile" element={<ManagerProfile/>}/>
        <Route path="/manager/create_profile" element={<ManagerCreateProfile/>}/>
        <Route path="/manager/manager_update_profile" element={<ManagerEditProfile/>}/>

        </Route>

      </Routes>
    </div>
  );
}

export default App;
        
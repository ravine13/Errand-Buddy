import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import Login from "./components/Login";

import DashBoardAdmin from "./components/AdminUI/DashBoardAdmin";
import Profile from "./components/AdminUI/Profile";
import CreateProfile from "./components/AdminUI/CreateProfile";
import EditProfile from "./components/AdminUI/EditProfile";
import ViewErrandBoys from "./components/AdminUI/ViewErrandBoys";

import DashBoardErrandboy from "./components/ErrandboyUI/DashBoardErrandboy";
import ErrandboyProfileForm from "./components/ErrandboyUI/ErrandboyProfileForm";
import ErrandboyProfile from "./components/ErrandboyUI/ErrandboyProfile";
import EditProfileForm from "./components/ErrandboyUI/EditProfileForm";

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
        <Route path="/errandboy" element={<DashBoardErrandboy />}>
        <Route path="/errandboy/profile" element={<ErrandboyProfile />} />
        <Route path="/errandboy/profile/create" element={<ErrandboyProfileForm />} />
        <Route path="/errandboy/profile/edit" element={<EditProfileForm />} />

       </Route>

        <Route path="/admin" element={<DashBoardAdmin />} >
        <Route path="/admin/admin_profile" element={<Profile />}/>
        <Route path="/admin/create_profile" element={<CreateProfile/>}/>
        <Route path="/admin/edit_profile" element={<EditProfile/>}/>
        <Route path="/admin/view_errandboys" element={<ViewErrandBoys />} />
        
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
        
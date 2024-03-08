import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import DashBoardHr from "./components/hrUI/DashBoardHr";
import DashBoardEmployee from "./components/employeeUI/DashBoardEmployee";
import EmployeeProfileForm from "./components/employeeUI/EmployeeProfileForm";
import EmployeeProfile from "./components/employeeUI/EmployeeProfile";
import EditProfileForm from "./components/employeeUI/EditProfileForm";
import Profile from "./components/hrUI/Profile";
import DashBoardManager from "./components/managerUI/DashBoardManager";
import CreateProfile from "./components/hrUI/CreateProfile";
import EditProfile from "./components/hrUI/EditProfile";
import ManagerEditProfile from './components/managerUI/ManagerEditProfile';
import ManagerCreateProfile from './components/managerUI/ManagerCreateProfile'
import ViewManagers from './components/hrUI/ViewManagers';
import ViewHrPersonnel from './components/hrUI/ViewHrPersonnel';
import ResetPassword from './components/ResetPassword';
import ChangePassword from "./components/ChangePassword";
import ManagerProfile from "./components/managerUI/ManagerProfile";


function App() {
  const [trainings, setTrainings] = useState([]);
  const [sessions, setSessions] = useState([]);

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

        <Route path="/hr" element={<DashBoardHr />} >
        <Route path="/hr/hr_profile" element={<Profile />}/>
        <Route path="/hr/create_profile" element={<CreateProfile/>}/>
        <Route path="/hr/edit_profile" element={<EditProfile/>}/>
        <Route path="/hr/view_managers" element={<ViewManagers />} />
        <Route path="/hr/view_hr_personnel" element={<ViewHrPersonnel />} />
        

        
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
        
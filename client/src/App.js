import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Logout from "./components/logout";

import DashBoardAdmin from "./components/AdminUI/DashBoardAdmin";
import Profile from "./components/AdminUI/Profile";
import CreateProfile from "./components/AdminUI/CreateProfile";
import EditProfile from "./components/AdminUI/EditProfile";
import ViewErrandBoys from "./components/AdminUI/ViewErrandBoys";

import DashBoardErrandboy from "./components/ErrandboyUI/DashBoardErrandboy";
import ErrandboyProfileForm from "./components/ErrandboyUI/ErrandboyProfileForm";
import ErrandboyProfile from "./components/ErrandboyUI/ErrandboyProfile";
import EditProfileForm from "./components/ErrandboyUI/EditProfileForm";
import History from "./components/ErrandboyUI/History";
import TaskList from "./components/ErrandboyUI/Task";
import Notification from "./components/ErrandboyUI/Notification";
import Message from "./components/ErrandboyUI/message"

import DashBoardUser from "./components/UserUI/DashBoardUser";
import UserProfile from "./components/UserUI/UserProfile";
import UserEditProfile from "./components/UserUI/UserEditProfile";
import UserCreateProfile from "./components/UserUI/UserCreateProfile";
import UserTasks from "./components/UserUI/UserTasks";
import UserNotifications from "./components/UserUI/UserNotifications";
import UserMessages from "./components/UserUI/UserMessages";
import UserPayments from "./components/UserUI/UserPayments";
import UserRatings from "./components/UserUI/UserRatings";

import ResetPassword from './components/ResetPassword';
import ChangePassword from "./components/ChangePassword";



function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/reset_password" element={<ResetPassword />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/errandboy" element={<DashBoardErrandboy />}>
        <Route path="/errandboy/profile" element={<ErrandboyProfile />} />
        <Route path="/errandboy/profile/create" element={<ErrandboyProfileForm />} />
        <Route path="/errandboy/profile/edit" element={<EditProfileForm />} />
        <Route path="/errandboy/Task" element={<TaskList/>}/>
        <Route path="/errandboy/notifications" element={<Notification/>}/>
        <Route path="/errandboy/messages" element={<UserMessages/>}/>
        <Route path="/errandboy/payments" element={<UserPayments/>}/>
        <Route path="/errandboy/ratings" element={<UserRatings/>}/>
        <Route path="/errandboy/history" element={<History/>}/>
        <Route path="/errandboy/message" element={<Message/>} />

       </Route>

        <Route path="/admin" element={<DashBoardAdmin />} >
        <Route path="/admin/profile" element={<Profile />}/>
        <Route path="/admin/create_profile" element={<CreateProfile/>}/>
        <Route path="/admin/edit_profile" element={<EditProfile/>}/>
        <Route path="/admin/view_errandboys" element={<ViewErrandBoys />} />
        
        </Route>

        <Route path="/user" element={<DashBoardUser />} >
        <Route path="/user/profile" element={<UserProfile/>}/>
        <Route path="/user/create_profile" element={<UserCreateProfile/>}/>
        <Route path="/user/edit_profile" element={<UserEditProfile/>}/>
        <Route path="/user/tasks" element={<UserTasks/>}/>
        <Route path="/user/notifications" element={<UserNotifications/>}/>
        <Route path="/user/messages" element={<UserMessages/>}/>
        <Route path="/user/payments" element={<UserPayments/>}/>
        <Route path="/user/ratings" element={<UserRatings/>}/>
        

        </Route>

      </Routes>
    </div>
  );
}

export default App;
        
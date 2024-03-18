import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import CreatePage from "./Pages/CreatePage";
import NewPage from "./Pages/NewPage";
import ProgressPage from "./Pages/ProgressPage";
import CompletedPage from "./Pages/CompletedPage";
import CanceledPage from "./Pages/CanceledPage";
import ProfilePage from "./Pages/ProfilePage";
import RegistrationPage from "./Pages/RegistrationPage";
import FogetPassPage from "./Pages/FogetPassPage";
import LoginPage from "./Pages/LoginPage";
import Loader from "./Components/Layout/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "./Helper/sessionHelper";

import VerifyOtpPage from "./Pages/AccountRecover/VerifyOtpPage";

import VerifyEmailPage from "./Pages/AccountRecover/VerifyEmailPage";
import ResetPassPage from "./Pages/AccountRecover/ResetPassPage";
const App = () => {
  if (getToken()) {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DashboardPage />} />
            <Route path='/create' element={<CreatePage />} />
            <Route path='/all' element={<NewPage />} />
            <Route path='/progress' element={<ProgressPage />} />
            <Route path='/completed' element={<CompletedPage />} />
            <Route path='/canceled' element={<CanceledPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/forgetPass' element={<FogetPassPage />} />
          </Routes>
          <Loader />
        </BrowserRouter>
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition:Bounce
        />
      </div>
    );
  } else {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to='/login' replace />} />

            <Route path='/login' element={<LoginPage />} />
            <Route path='/verifyEmail' element={<VerifyEmailPage />} />
            <Route path='/verifyOTP' element={<VerifyOtpPage />} />
            <Route path='/resetPass' element={<ResetPassPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/forgetPass' element={<FogetPassPage />} />
          </Routes>
          <Loader />
        </BrowserRouter>
        <ToastContainer
          position='top-center'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition:Bounce
        />
      </div>
    );
  }
};

export default App;

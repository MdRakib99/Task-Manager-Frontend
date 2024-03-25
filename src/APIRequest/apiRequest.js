import axios from "axios";
import { errorToast, successToast } from "../Helper/formHelper";
import store from "../Redux/Store/store";
import { hideLoader, showLoader } from "../Redux/StateSlice/setting-slice";
import {
  getToken,
  setEmail,
  setOTP,
  setToken,
  setUserDetails,
} from "../Helper/sessionHelper";
import {
  setCanceledTask,
  setCompletedTask,
  setNewTask,
  setProgressTask,
} from "../Redux/StateSlice/task-slice";
import { setSummary } from "../Redux/StateSlice/summary-slice";
import { setProfile } from "../Redux/StateSlice/profile-slice";
const BaseURL = "https://task-manager-backend-one.vercel.app/api/v1";
// const BaseURL = "http://localhost:3010/api/v1";

const axiosHeader = { headers: { token: getToken() } };

export function registrationRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  // API Calling Start
  store.dispatch(showLoader());
  let URL = `${BaseURL}/registration`;
  let postBody = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    password: password,
    photo: photo,
  };
  return axios
    .post(URL, postBody)
    .then((res) => {
      store.dispatch(hideLoader());
      //API Calling End
      if (res.status === 200) {
        if (res.data["status"] === "fail") {
          if (res.data["data"].includes("duplicate key error")) {
            errorToast("Email Already Exist");
            return false;
          } else {
            errorToast("something went wrong!");
            return false;
          }
        } else {
          successToast("Registration Success!");
          return true;
        }
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      //Call End
      errorToast("Something Went Wrong!");
      return false;
    });
}

export function loginRequest(email, pass) {
  //API Calling Start
  store.dispatch(showLoader());
  let URL = `${BaseURL}/login`;
  let postBody = {
    email: email,
    password: pass,
  };

  return axios
    .post(URL, postBody)
    .then((res) => {
      store.dispatch(hideLoader());

      if (res.status === 200) {
        setToken(res.data["token"]);
        setUserDetails(res.data["data"]);
        successToast("Login Success!");
        return true;
      } else {
        errorToast("Ivalid Email Or Password");
        return false;
      }
    })
    .catch((err) => {
      errorToast("Something went wrong!");
      store.dispatch(hideLoader());
      return false;
    });
}

export function newTaskRequest(title, description) {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/createTask`;
  let postBody = { title: title, description: description, status: "new" };

  return axios
    .post(URL, postBody, axiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        successToast("Created Task Successfully!");
        return true;
      } else {
        errorToast("Something went wrong!");
        store.dispatch(hideLoader());
        return false;
      }
    })
    .catch((err) => {
      errorToast("something went wrong!");
      store.dispatch(hideLoader());
    });
}

//Task List Request

export const taskListRequest = (status) => {
  let URL = `${BaseURL}/taskList/${status}`;

  axios
    .get(URL, axiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());

      if (res.status === 200) {
        if (status === "new") {
          store.dispatch(setNewTask(res.data["data"]));
        } else if (status === "complete") {
          store.dispatch(setCompletedTask(res.data["data"]));
        } else if (status === "progress") {
          store.dispatch(setProgressTask(res.data["data"]));
        } else if (status === "cancel") {
          store.dispatch(setCanceledTask(res.data["data"]));
        }
      } else {
        errorToast("Something went wrong");
      }
    })
    .catch((res) => {
      errorToast("Something went wrong");
      store.dispatch(hideLoader());
    });
};

//Task summary Request

export function taskSummaryRequest() {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/taskStatusCount`;

  axios
    .get(URL, axiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());
      if (res.status === 200) {
        store.dispatch(setSummary(res.data["data"]));
      } else {
        errorToast("something went wrong!");
      }
    })
    .catch((res) => {
      store.dispatch(hideLoader());
      errorToast("something went wrong!");
    });
}

export function taskDeleteRequest(id) {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/deleteTask/${id}`;

  return axios
    .delete(URL, axiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());

      if (res.status === 200) {
        successToast("Delete Successful");
        return true;
      } else {
        errorToast("Something went wrong!");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
    });
}

export function taskUpdateRequest(id, status) {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/updateTask/${id}/${status}`;

  return axios
    .get(URL, axiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());

      if (res.status === 200) {
        successToast("Status Updated");
        return true;
      } else {
        errorToast("Something went wrong!");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
    });
}

export function profileDetailsRequest() {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/profileDetails`;

  return axios
    .get(URL, axiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());

      if (res.status === 200) {
        store.dispatch(setProfile(res.data["data"][0]));
      } else {
        errorToast("Something went wrong!");
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
    });
}

export function profileUpdateRequest(
  email,
  firstName,
  lastName,
  mobile,
  password,
  photo
) {
  let URL = `${BaseURL}/profileUpdate`;

  let postBody = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,
    password: password,
    photo: photo,
  };

  let userDetails = {
    email: email,
    firstName: firstName,
    lastName: lastName,
    mobile: mobile,

    photo: photo,
  };

  return axios
    .post(URL, postBody, axiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());

      if (res.status === 200) {
        successToast("Successfully updated Profile");
        setUserDetails(userDetails);

        return true;
      } else {
        errorToast("Something went wrong!");
        return false;
      }
    })
    .catch((err) => {
      store.dispatch(hideLoader());
      errorToast("Something went wrong!");
    });
}

export function verifyEmailRequest(email) {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/recoverVerifyEmail/${email}`;

  return axios
    .get(URL)
    .then((res) => {
      store.dispatch(hideLoader());

      if (res.status === 200) {
        successToast("Successfully Verified Email!");
        setEmail(email);
        return true;
      } else {
        errorToast("Email doesn't match!");
        return false;
      }
    })
    .catch((err) => {
      errorToast("Something went wrong!");
      store.dispatch(hideLoader());
    });
}

export function verifyOtpRequest(email, otp) {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/recoverVerifyOTP/${email}/${otp}`;

  return axios
    .get(URL, axiosHeader)
    .then((res) => {
      store.dispatch(hideLoader());

      if (res.status === 200) {
        setOTP(otp);
        return true;
      } else {
        errorToast("Something went wrong!");
        return false;
      }
    })
    .catch((err) => {
      errorToast("Something went wrong!");
      store.dispatch(hideLoader());
    });
}

export function resetPassRequest(email, otp, password) {
  store.dispatch(showLoader());
  let URL = `${BaseURL}/recoverResetPass`;
  let postBody = { email: email, otp: otp, password: password };

  return axios
    .post(URL, postBody)
    .then((res) => {
      store.dispatch(hideLoader());

      if (res.status === 200) {
        return true;
      } else {
        errorToast("Something went wrong!");
        return false;
      }
    })
    .catch((err) => {
      errorToast("Something went wrong!");
      store.dispatch(hideLoader());
    });
}

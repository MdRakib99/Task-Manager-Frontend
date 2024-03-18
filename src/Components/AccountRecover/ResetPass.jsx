import React, { Fragment, useRef } from "react";
import { errorToast, isEmpty, successToast } from "../../Helper/formHelper";
import { getEmail, getOTP } from "../../Helper/sessionHelper";
import { resetPassRequest } from "../../APIRequest/apiRequest";
import { useNavigate } from "react-router-dom";

const ResetPass = () => {
  let newPassRef = useRef();
  let confirmPassRef = useRef();

  const navigate = useNavigate();

  const resetPass = () => {
    let newPass = newPassRef.current.value;
    let confirmPass = confirmPassRef.current.value;

    if (isEmpty(newPass)) {
      errorToast("password empty!");
    } else if (isEmpty(confirmPass)) {
      errorToast("password empty!");
    } else if (newPass !== confirmPass) {
      errorToast("Password dosen't match!");
    } else {
      resetPassRequest(getEmail(), getOTP(), newPass).then((res) => {
        if (res === true) {
          successToast("Password Changed  Successfull!");
          navigate("/login");
        } else {
          errorToast("Something went wrong!");
        }
      });
    }
  };
  return (
    <Fragment>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-7 col-lg-6 center-screen'>
            <div className='card w-90 p-4'>
              <div className='card-body'>
                <h4>SET NEW PASSWORD</h4>
                <br />
                <label>Your email address</label>
                <input
                  readOnly={true}
                  value={getEmail()}
                  placeholder='User Email'
                  className='form-control animated fadeInUp'
                  type='email'
                />
                <br />
                <label>New Password</label>
                <input
                  ref={newPassRef}
                  placeholder='New Password'
                  className='form-control animated fadeInUp'
                  type='password'
                />
                <br />
                <label>Confirm Password</label>
                <input
                  ref={confirmPassRef}
                  placeholder='Confirm Password'
                  className='form-control animated fadeInUp'
                  type='password'
                />
                <br />
                <button
                  onClick={resetPass}
                  className='btn w-100 animated fadeInUp float-end btn-primary'
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPass;

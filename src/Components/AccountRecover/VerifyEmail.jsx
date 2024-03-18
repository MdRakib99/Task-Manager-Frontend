import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { errorToast, isEmail } from "../../Helper/formHelper";
import { verifyEmailRequest } from "../../APIRequest/apiRequest";

const VerifyEmail = () => {
  let emailRef = useRef();
  let navigate = useNavigate();

  const verifyEmail = () => {
    let email = emailRef.current.value;
    if (isEmail(email)) {
      errorToast("valid email required!");
    } else {
      verifyEmailRequest(email).then((res) => {
        if (res === true) {
          navigate("/verifyOTP");
        } else {
          errorToast("Email Doesn't match!");
        }
      });
    }
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-7 col-lg-6 center-screen'>
            <div className='card w-90  p-4'>
              <div className='card-body'>
                <h4>EMAIL ADDRESS</h4>
                <br />
                <label>Your email address</label>
                <input
                  ref={emailRef}
                  placeholder='User Email'
                  className='form-control animated fadeInUp'
                  type='email'
                />
                <br />
                <button
                  onClick={verifyEmail}
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

export default VerifyEmail;

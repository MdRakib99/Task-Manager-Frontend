import React, { Fragment, useRef, useState } from "react";
import ReactCodeInput from "react-code-input";
import { errorToast, successToast } from "../../Helper/formHelper";
import { verifyOtpRequest } from "../../APIRequest/apiRequest";
import { getEmail } from "../../Helper/sessionHelper";
import { useNavigate } from "react-router-dom";
const VerifyOtp = () => {
  let email = getEmail();
  let navigate = useNavigate();
  let defaultInputStyle = {
    fontFamily: "monospace",
    MozAppearance: "textfield",
    margin: "4px",
    paddingLeft: "8px",
    width: "45px",
    borderRadius: "3px",
    height: "45px",
    fontSize: "32px",
    border: "1px solid lightskyblue",
    boxSizing: "border-box",
    color: "black",
    backgroundColor: "white",
    borderColor: "lightgrey",
  };
  const [otp, setOtp] = useState();
  const submitOTP = () => {
    if (otp.length === 6) {
      verifyOtpRequest(email, otp).then((res) => {
        if (res === true) {
          successToast("OTP Verification Successfull");
          navigate("/resetPass");
        } else {
          errorToast("Invalid OTP");
        }
      });
    } else {
      errorToast("Enter 6 digit Code");
    }
  };
  return (
    <Fragment>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-md-7 col-lg-6 center-screen'>
            <div className='card w-90  p-4'>
              <div className='card-body'>
                <h4>OTP VERIFICATION </h4>
                <p>
                  A 6 Digit verification code has been sent to your email
                  address.{" "}
                </p>
                <ReactCodeInput
                  // ref={(input) => (otpRef = input)}
                  onChange={(value) => setOtp(value)}
                  inputStyle={defaultInputStyle}
                  fields={6}
                />
                <br /> <br />
                <button
                  onClick={submitOTP}
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

export default VerifyOtp;

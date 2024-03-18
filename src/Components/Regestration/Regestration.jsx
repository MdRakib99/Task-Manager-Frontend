import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  errorToast,
  isEmail,
  isEmpty,
  isMobile,
} from "../../Helper/formHelper";
import { registrationRequest } from "../../APIRequest/apiRequest";

const Regestration = () => {
  {
    let emailRef,
      firstNameRef,
      lastNameRef,
      mobileRef,
      passwordRef = useRef();

    let navigate = useNavigate();

    const onRegistration = () => {
      let email = emailRef.value;

      let firstName = firstNameRef.value;

      let lastName = lastNameRef.value;

      let mobile = mobileRef.value;

      let password = passwordRef.value;

      let photo =
        "data:image/jpeg;base64,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";

      if (isEmail(email)) {
        errorToast("Valid Email Address Required !");
      } else if (isEmpty(firstName)) {
        errorToast("First Name Required !");
      } else if (isEmpty(lastName)) {
        errorToast("Last Name Required !");
      } else if (!isMobile(mobile)) {
        errorToast("Valid Mobile  Required !");
      } else if (isEmpty(password)) {
        errorToast("Password Required !");
      } else {
        registrationRequest(
          email,
          firstName,
          lastName,
          mobile,
          password,
          photo
        ).then((result) => {
          if (result === true) {
            navigate("/login");
          }
        });
      }
    };

    return (
      <div className='container'>
        <div className='row  justify-content-center'>
          <div className='col-md-10 col-lg-10 center-screen'>
            <div className='card animated fadeIn w-100 p-3'>
              <div className='card-body'>
                <h4>Sign Up</h4>
                <hr />
                <div className='container-fluid m-0 p-0'>
                  <div className='row m-0 p-0'>
                    <div className='col-md-4 p-2'>
                      <label>Email Address</label>
                      <input
                        ref={(input) => (emailRef = input)}
                        placeholder='User Email'
                        className='form-control animated fadeInUp'
                        type='email'
                      />
                    </div>
                    <div className='col-md-4 p-2'>
                      <label>First Name</label>
                      <input
                        ref={(input) => (firstNameRef = input)}
                        placeholder='First Name'
                        className='form-control animated fadeInUp'
                        type='text'
                      />
                    </div>
                    <div className='col-md-4 p-2'>
                      <label>Last Name</label>
                      <input
                        ref={(input) => (lastNameRef = input)}
                        placeholder='Last Name'
                        className='form-control animated fadeInUp'
                        type='text'
                      />
                    </div>
                    <div className='col-md-4 p-2'>
                      <label>Mobile Number</label>
                      <input
                        ref={(input) => (mobileRef = input)}
                        placeholder='Mobile'
                        className='form-control animated fadeInUp'
                        type='mobile'
                      />
                    </div>
                    <div className='col-md-4 p-2'>
                      <label>Password</label>
                      <input
                        ref={(input) => (passwordRef = input)}
                        placeholder='User Password'
                        className='form-control animated fadeInUp'
                        type='password'
                      />
                    </div>
                  </div>
                  <div className='row mt-2 p-0'>
                    <div className='col-md-4 p-2'>
                      <button
                        onClick={onRegistration}
                        className='btn mt-3 w-100 float-end btn-primary animated fadeInUp'
                      >
                        Complete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Regestration;

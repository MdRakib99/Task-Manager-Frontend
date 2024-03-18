import React, { useEffect, useRef } from "react";

import {
  profileDetailsRequest,
  profileUpdateRequest,
} from "../../APIRequest/apiRequest";
import { useSelector } from "react-redux";
import {
  errorToast,
  getBase64,
  isEmail,
  isEmpty,
  isMobile,
} from "../../Helper/formHelper";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  useEffect(() => {
    (() => {
      profileDetailsRequest();
    })();
  }, []);

  const profileData = useSelector((state) => state.profile.value);

  let navigate = useNavigate();
  let emailRef,
    firstNameRef,
    lastNameRef,
    mobileRef,
    passwordRef,
    userImgRef,
    userImgView = useRef();

  const previewImage = () => {
    let ImgFile = userImgRef.files[0];
    getBase64(ImgFile).then((base64Img) => {
      userImgView.src = base64Img;
    });
  };

  const updateMyProfile = () => {
    let email = emailRef.value;
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let mobile = mobileRef.value;
    let password = passwordRef.value;
    let photo = userImgView.src;

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
      profileUpdateRequest(
        email,
        firstName,
        lastName,
        mobile,
        password,
        photo
      ).then((result) => {
        if (result === true) {
          navigate("/");
        }
      });
    }
  };

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center'>
        <div className='col-md-12'>
          <div className='card'>
            <div className='card-body'>
              <div className='content-fluid'>
                <img
                  ref={(input) => (userImgView = input)}
                  className='icon-nav-img-lg'
                  src={profileData["photo"]}
                  alt=''
                />
                <hr />
                <div className='row'>
                  <div className='col-4 p-2'>
                    <label htmlFor=''>Profile Picture</label>
                    <input
                      ref={(input) => (userImgRef = input)}
                      className='form-control animated fadeInUp'
                      type='file'
                      onChange={previewImage}
                    />
                  </div>
                  <div className='col-4 p-2'>
                    <label htmlFor=''>Email Address</label>
                    <input
                      key={Date.now()}
                      defaultValue={profileData["email"]}
                      readOnly={true}
                      ref={(input) => (emailRef = input)}
                      placeholder='Email'
                      className='form-control animated fadeInUp'
                      type='text'
                    />
                  </div>
                  <div className='col-4 p-2'>
                    <label htmlFor=''>First Name</label>
                    <input
                      key={Date.now()}
                      defaultValue={profileData["firstName"]}
                      ref={(input) => (firstNameRef = input)}
                      placeholder='First Name'
                      className='form-control animated fadeInUp'
                      type='text'
                    />
                  </div>
                  <div className='col-4 p-2'>
                    <label htmlFor=''>Last Name</label>
                    <input
                      key={Date.now()}
                      defaultValue={profileData["lastName"]}
                      ref={(input) => (lastNameRef = input)}
                      placeholder=''
                      className='form-control animated fadeInUp'
                      type='text'
                    />
                  </div>
                  <div className='col-4 p-2'>
                    <label htmlFor=''>Mobile</label>
                    <input
                      key={Date.now()}
                      defaultValue={profileData["mobile"]}
                      ref={(input) => (mobileRef = input)}
                      placeholder=''
                      className='form-control animated fadeInUp'
                      type='text'
                    />
                  </div>

                  <div className='col-4 p-2'>
                    <label htmlFor=''>Password</label>
                    <input
                      key={Date.now()}
                      defaultValue={profileData["password"]}
                      ref={(input) => (passwordRef = input)}
                      placeholder=''
                      className='form-control animated fadeInUp'
                      type='password'
                    />
                  </div>
                  <div className='col-4 p-2'>
                    <button
                      onClick={updateMyProfile}
                      className='btn w-100 float-end btn-primary animated fadeInUp'
                    >
                      Update
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
};

localStorage.setItem("isActive", false);

export default Profile;

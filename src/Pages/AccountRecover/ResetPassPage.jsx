import React, { Fragment, useRef } from "react";
import { errorToast, isEmpty, successToast } from "../../Helper/formHelper";
import { getEmail } from "../../Helper/sessionHelper";
import ResetPass from "../../Components/AccountRecover/ResetPass";

const ResetPassPage = () => {
  return (
    <div>
      <ResetPass />
    </div>
  );
};

export default ResetPassPage;

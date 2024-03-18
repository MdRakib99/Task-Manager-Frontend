import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const loader = useSelector((state) => state.settings.loader);
  return (
    <div className={`LoadingOverly ${loader}`}>
      <div className='Line-Progress'>
        <div className='indeterminate'></div>
      </div>
    </div>
  );
};

export default Loader;

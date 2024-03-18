import React, { Suspense, lazy } from "react";

const LazyLoader = () => {
  return (
    <div className='LoadingOverly'>
      <div className='Line-Progress'>
        <div className='indeterminate'></div>
      </div>
    </div>
  );
};

export default LazyLoader;

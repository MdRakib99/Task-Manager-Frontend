import React, { Suspense, lazy } from "react";
import Layout from "../Components/Layout/Layout";
import LazyLoader from "../Components/Layout/LazyLoader";

const Regestration = lazy(() =>
  import("../Components/Regestration/Regestration")
);

const RegistrationPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <Regestration />
      </Suspense>
    </Layout>
  );
};

export default RegistrationPage;

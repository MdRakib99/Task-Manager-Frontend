import React, { Suspense, lazy } from "react";
import Layout from "../Components/Layout/Layout";
import LazyLoader from "../Components/Layout/LazyLoader";
const Canceled = lazy(() => import("../Components/Canceled/Canceled"));

const CanceledPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <Canceled />
      </Suspense>
    </Layout>
  );
};

export default CanceledPage;

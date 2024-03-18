import React, { Suspense, lazy } from "react";
import Layout from "../Components/Layout/Layout";
import LazyLoader from "../Components/Layout/LazyLoader";

const Completed = lazy(() => import("../Components/Completed/Completed"));

const CompletedPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <Completed />
      </Suspense>
    </Layout>
  );
};

export default CompletedPage;

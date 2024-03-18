import React, { Suspense, lazy } from "react";
import Layout from "../Components/Layout/Layout";
import LazyLoader from "../Components/Layout/LazyLoader";

const Progress = lazy(() => import("../Components/Progress/Progress"));
const ProgressPage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <Progress />
      </Suspense>
    </Layout>
  );
};

export default ProgressPage;

import React, { Suspense, lazy } from "react";
import Layout from "../Components/Layout/Layout";
import LazyLoader from "../Components/Layout/LazyLoader";

const Create = lazy(() => import("../Components/Create/Create"));
const CreatePage = () => {
  return (
    <Layout>
      <Suspense fallback={<LazyLoader />}>
        <Create />
      </Suspense>
    </Layout>
  );
};

export default CreatePage;

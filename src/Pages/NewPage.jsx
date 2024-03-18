import React, { Suspense, lazy } from "react";
import Layout from "../Components/Layout/Layout";
import LazyLoader from "../Components/Layout/LazyLoader";

const New = lazy(() => import("../Components/New/New"));
const NewPage = () => {
  return (
    <div>
      <Layout>
        <Suspense fallback={<LazyLoader />}>
          <New />
        </Suspense>
      </Layout>
    </div>
  );
};

export default NewPage;

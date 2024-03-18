import React, { Suspense, lazy } from "react";
import Layout from "../Components/Layout/Layout";
import LazyLoader from "../Components/Layout/LazyLoader";

const Dashboard = lazy(() => import("../Components/Dashboard/Dashboard"));
const DashboardPage = () => {
  return (
    <div>
      <Layout>
        <Suspense fallback={<LazyLoader />}>
          <Dashboard />
        </Suspense>
      </Layout>
    </div>
  );
};

export default DashboardPage;

import React, { Suspense, lazy } from "react";
import LazyLoader from "../Components/Layout/LazyLoader";

const NotFound = lazy(() => import("../Components/NotFound/NotFound"));
const NotFoundPage = () => {
  return (
    <div>
      <Suspense fallback={<LazyLoader />}>
        <NotFound />
      </Suspense>
    </div>
  );
};

export default NotFoundPage;

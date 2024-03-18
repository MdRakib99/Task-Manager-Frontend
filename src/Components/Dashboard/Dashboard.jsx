import React, { Fragment, useEffect } from "react";
import { taskSummaryRequest } from "../../APIRequest/apiRequest";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  useEffect(() => {
    (() => {
      taskSummaryRequest();
    })();
  }, []);
  const summaryItems = useSelector((state) => state.summary.value);

  if (summaryItems.length === 0) {
    return (
      <div>
        <Container className='content-body'>
          <div className='col-12 col-md-6 col-lg-8 px-3'>
            <h5>Canceled Task</h5>
          </div>
          <h1
            className='d-flex justify-content-center align-items-center'
            style={{ minHeight: "50vh" }}
          >
            You don't have any task!
          </h1>
        </Container>
      </div>
    );
  } else {
    return (
      <Fragment>
        <div className='container'>
          <div className='row'>
            {summaryItems.map((item, i) => {
              return (
                <div key={i} className='col-12 col-lg-3 col-sm-6 col-md-3 p-2'>
                  <div className='card h-100'>
                    <div className='card-body'>
                      <h5 className='animated fadeInUp'>{item["_id"]}</h5>
                      <h6 className='text-secondary animated fadeInUp'>
                        {item["sum"]}
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Dashboard;

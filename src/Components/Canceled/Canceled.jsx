import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import { AiOutlineCalendar, AiOutlineDelete } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { taskListRequest } from "../../APIRequest/apiRequest";
import { useSelector } from "react-redux";
import { deleteTask } from "../../Helper/deleteAlert";
import { updateTask } from "../../Helper/updateAlert";

const Canceled = () => {
  useEffect(() => {
    (() => {
      taskListRequest("cancel");
    })();
  }, []);

  const cancelledTaskList = useSelector((state) => state.task.canceled);
  const deleteItem = (id) => {
    deleteTask(id).then((result) => {
      if (result === true) {
        taskListRequest("cancel");
      }
    });
  };

  const updateTaskStatus = (id, status) => {
    updateTask(id, status).then((result) => {
      if (result === true) {
        taskListRequest("cancel");
      }
    });
  };

  if (cancelledTaskList.length === 0) {
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
            Nothing to show any task in here!
          </h1>
        </Container>
      </div>
    );
  } else {
    return (
      <Fragment>
        <Container fluid={true} className='content-body'>
          <div className='row p-0 m-0'>
            <div className='col-12 col-md-6 col-lg-8 px-3'>
              <h5>Canceled Task</h5>
            </div>
            <div className='col-12 float-end col-md-6 col-lg-4 px-2'>
              <div className='row'>
                <div className='col-8'>
                  <input className='form-control w-100' />
                </div>
                <div className='col-4'>
                  <button className='btn btn-primary w-100'>Search</button>
                </div>
              </div>
            </div>
          </div>
          <div className='row p-0 m-0'>
            {cancelledTaskList.map((item, i) => {
              return (
                <div
                  key={i.toString()}
                  className='col-12 col-lg-4 col-sm-6 col-md-4  p-2'
                >
                  <div className='card h-100'>
                    <div className='card-body'>
                      <h6 className='animated fadeInUp'>{item.title}</h6>
                      <p className='animated fadeInUp'>{item.description}</p>
                      <p className='m-0 animated fadeInUp p-0'>
                        <AiOutlineCalendar /> {item.createDate}
                        <a
                          onClick={() => {
                            updateTaskStatus(item["_id"], item["status"]);
                          }}
                          className='icon-nav text-primary mx-1'
                        >
                          <AiOutlineEdit />
                        </a>
                        <a
                          onClick={() => {
                            deleteItem(item._id);
                          }}
                          className='icon-nav text-danger mx-1'
                        >
                          <AiOutlineDelete />
                        </a>
                        <a className='badge float-end bg-danger'>
                          {item.status}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Fragment>
    );
  }
};

export default Canceled;

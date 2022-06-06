import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserAction, listUser } from "../actions/userActions";
import "./Admin.css";

const AdminPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const reportList = useSelector((state) => state.reportList);
  const { reports } = reportList;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteUserAction(id));
      navigate("/");
    }
  };
  useEffect(() => {
    dispatch(listUser());
  }, [dispatch, navigate]);

  return (
    
    <div className="container mt-5 mb-5">
      <div className="container mt-5 mb-5">
        
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Users
            </button>
          </li>
          <Link to="/report">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                to="/report"
              >
                Reports
              </button>
            </li>
          </Link>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="messages-tab"
              data-bs-toggle="tab"
              data-bs-target="#messages"
              type="button"
              role="tab"
              aria-controls="messages"
              aria-selected="false"
            >
              Messages
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="settings-tab"
              data-bs-toggle="tab"
              data-bs-target="#settings"
              type="button"
              role="tab"
              aria-controls="settings"
              aria-selected="false"
            >
              Settings
            </button>
          </li>
        </ul>
      </div>
      <div>
        <table className="table table-striped bordered hover mt-5 mb-5">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Student Number</th>
              <th scope="col">Year & Section</th>
              <th scope="col">E-mail</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
              <>
                {users?.map((user) => (
                  <tr>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.studentnumber}</td>
                    <td>{user.yearsection}</td>
                    <td>{user.email}</td>
                    
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(user._id)}
                    >
                      Delete User
                    </Button>
                  </tr>
                ))}
              </>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;

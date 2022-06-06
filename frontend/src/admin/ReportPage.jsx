import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listReports } from "../actions/reportActions";
import { Button } from "react-bootstrap";

const ReportPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const reportList = useSelector((state) => state.reportList);
  const { reports } = reportList;

  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  
  useEffect(() => {
    dispatch(listReports());
  }, [dispatch, navigate]);

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="container">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <Link to="/admin">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
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
            </Link>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile"
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
              >
                Reports
              </button>
            </li>
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

        <table className="table table-striped bordered hover mt-5 mb-5">
          <thead>
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Student Number</th>
              <th scope="col">Year & Section</th>
              <th scope="col">E-mail</th>
              <th scope="col">Created At</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((user) => (
              <>
                {reports
                  ?.sort((a, b) => a.createdAt > b.createdAt ? -1 : 1)
                  .map((report) => (
                    <>
                      <tr>
                        <td>{user.fname}</td>
                        <td>{user.lname}</td>
                        <td>{user.studentnumber}</td>
                        <td>{user.yearsection}</td>
                        <td>{user.email}</td>
                        <td>{report.createdAt}</td>
                        <Button
                          variant="info"
                          className="mx-2"
                          href={`/viewreports/${report._id}`}
                        >
                          View Report
                        </Button>
                      </tr>
                    </>
                  ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ReportPage;

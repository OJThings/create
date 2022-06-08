import React, { useEffect } from "react";
import { Form, FormControl, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
const Header = ({ setSearch }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    if (window.confirm("Are you sure")) {
      dispatch(logout());
    }
    navigate("/");
  };

  useEffect(() => {}, [userInfo]);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/services">
                  Services
                </Link>
              </li>
            </ul>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <Link className="navbar-brand fw-bolder fs-4 mx-auto" to="/home">
                Incident Report System
              </Link>
              <Nav className="">
                {userInfo && (
                  <Form>
                    <FormControl
                      type="text"
                      placeholder="Search incident type..."
                      className="mr-sm-2"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </Form>
                )}
              </Nav>
              {userInfo ? (
                <>
                  <Link className="nav-link" to="/myreports">
                    {" "}
                    My reports
                  </Link>
                  <NavDropdown
                    title={userInfo?.fname}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item href="/profile">
                      <img
                        alt=""
                        src={`${userInfo.pic}`}
                        width="25"
                        height="25"
                        style={{ marginRight: 10 }}
                      />
                      My Profile
                    </NavDropdown.Item>

                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Link className="nav-link" to="/signin">
                  {" "}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

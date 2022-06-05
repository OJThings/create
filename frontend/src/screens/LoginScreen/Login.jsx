import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/userActions";
import ErrorMessage from "../../components/Actions/ErrorMessage";
import Loading from "../../components/Actions/Loading";
import "./Login.css";
const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
    if (userInfo) {
      navigate("/home");
    }
  }, [history, userInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const toggleBtn = () => {
    setState((prevState) => !prevState);
  };
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="container shadow my-5 mt-5 mb-5">
          {loading && <Loading />}
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          <div className="row">
            <div className="col-md-5 d-flex flex-column align-items-center text-white justify-content-center form">
              <h1 className="display-4 fw-bolder">Welcome Back</h1>
              <p className="lead text-center">
                Enter Your Credentials To Login
              </p>
              <h5 className="mb-4">OR</h5>
              <Link to="/signup" className="btn btn-outline-light pb-2 w-50">
                Signup
              </Link>
            </div>
            <div className="col-md-6 p-5">
              <h1 className="display-6 fw-bolder mb-5">SIGN IN</h1>
              <form onSubmit={submitHandler}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    E-mail
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Password
                  </label>
                  <input
                    type={state ? "text" : "password"}
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {state ? (
                    <FontAwesomeIcon
                      icon={faEyeSlash}
                      className="password-icon2"
                      onClick={toggleBtn}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faEye}
                      className="password-icon2"
                      onClick={toggleBtn}
                    />
                  )}
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-4">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

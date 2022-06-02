import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../actions/userActions";
import ErrorMessage from "../../components/Actions/ErrorMessage";
import Loading from "../../components/Actions/Loading";

const Register = () => {
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [yearsection, setYearsection] = useState("");
  const [studentnumber, setStudentnumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const postDetails = (pics) => {
    if (
      pics ===
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    ) {
      return setPicMessage("Please Select an Image");
    }
    setPicMessage(null);
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "webincident");
      data.append("cloud_name", "dfee7bpbw");
      fetch("https://api.cloudinary.com/v1_1/dfee7bpbw/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/signin");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    } else
      dispatch(
        register(
          fname,
          mname,
          lname,
          studentnumber,
          yearsection,
          username,
          email,
          password,
          pic
        )
      );
  };
  return (
    <>
      <div>
        <div className="container shadow my-5">
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          <div className="row justify-content-end">
            <div className="col-md-6 d-flex flex-column align-items-center text-white justify-content-center form order-2">
              <h1 className="display-4 fw-bolder">Hello, Friend</h1>
              <p className="lead text-center">Enter Your Details to Register</p>
              <h5 className="mb-4">OR</h5>

              {loading && <Loading />}
              <Link to="/signin" className="btn btn-outline-light pb-2 w-50">
                Signin
              </Link>
            </div>
            <div className="col-md-6 p-5">
              <form onSubmit={submitHandler}>
                <div className="form-row">
                  <div className="form-group col-md-5">
                    <label htmlFor="inputCity">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fname"
                      name="fname"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="inputState">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lname"
                      name="lname"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    ></input>
                  </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="inputZip">Middle initial</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mname"
                      name="mname"
                      value={mname}
                      onChange={(e) => setMname(e.target.value)}
                      placeholder="Optional"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Username</label>
                  <input
                    className="form-control"
                    type="username"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">E-mail</label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Year & Section</label>
                  <input
                    className="form-control"
                    type="text"
                    classNameName="form-control"
                    id="yearsection"
                    name="yearsection"
                    value={yearsection}
                    onChange={(e) => setYearsection(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputAddress">Student number</label>
                  <input
                    className="form-control"
                    type="text"
                    classNameName="form-control"
                    id="studentnumber"
                    name="studentnumber"
                    value={studentnumber}
                    onChange={(e) => setStudentnumber(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Confirm password</label>
                    <input
                      type="password"
                      id="password2"
                      className="form-control"
                      name="password2"
                      placeholder="Confirm your password"
                      value={confirmpassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                {picMessage && (
                  <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                )}
                <div className="mb-3">
                  <label htmlFor="formFile" className="form-label">
                    Profile Picture
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="custom-file"
                    onChange={(e) => postDetails(e.target.files[0])}
                  />
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck"
                    />
                    <label className="form-check-label" htmlFor="gridCheck">
                      Remember me
                    </label>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

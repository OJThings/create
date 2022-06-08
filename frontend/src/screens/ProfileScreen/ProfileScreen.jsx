import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../actions/userActions";
import ErrorMessage from "../../components/Actions/ErrorMessage";
import Loading from "../../components/Actions/Loading";
import "./ProfileScreen.css";
import Mainscreen from "../../components/MainScreen/MainScreen";


const ProfileScreen = () => {
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [yearsection, setYearsection] = useState("");
  const [studentnumber, setStudentnumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [picMessage, setPicMessage] = useState();
  const [pic, setPic] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      setFname(userInfo.fname);
      setMname(userInfo.mname);
      setLname(userInfo.lname);
      setStudentnumber(userInfo.studentnumber);
      setYearsection(userInfo.yearsection);
      setUsername(userInfo.username);
      setEmail(userInfo.email);
      setPic(userInfo.pic);
    }
  }, [navigate, userInfo]);

  const postDetails = (pics) => {
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
          console.log(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please Select an Image");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateProfile({
        fname,
        mname,
        lname,
        studentnumber,
        yearsection,
        username,
        email,
        password,
        pic,
      })
    );
  };

  return (
    <>
      <Mainscreen title="EDIT PROFILE">
        <div>
          <Row className="profileContainer">
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                {loading && <Loading />}
                {success && (
                  <ErrorMessage variant="success">
                    Updated Successfully
                  </ErrorMessage>
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Label>Middle Initial</Form.Label>
                    <Form.Control
                      type="text"
                      value={mname}
                      onChange={(e) => setMname(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Year & Section</Form.Label>
                  <Form.Control
                    type="text"
                    value={yearsection}
                    onChange={(e) => setYearsection(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Student Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={studentnumber}
                    onChange={(e) => setStudentnumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
                <Form.Group className="mb-3">
                  <Form.Label>Update Profile Picture</Form.Label>
                  <Form.Control
                    type="file"
                    size="md"
                    onChange={(e) => postDetails(e.target.files[0])}
                    id="custom-file"
                    label="Upload Profile Picture"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Update Profile
                </Button>
              </Form>
            </Col>
            <Col
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={pic} alt={fname} className="profilePic" />
            </Col>
          </Row>
        </div>
      </Mainscreen>
    </>
  );
};

export default ProfileScreen;

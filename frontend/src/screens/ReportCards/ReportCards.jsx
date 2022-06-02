import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listReports } from "../../actions/reportActions";
import MainScreen from "../../components/MainScreen/MainScreen";
import AddingPop from "../Popups/AddingPop";
import AvailPop from "../Popups/AvailPop";
import FailedPop from "../Popups/FailedPop";
import IncPop from "../Popups/IncPop";
import LowerPop from "../Popups/LowerPop";
import OthersPop from "../Popups/OthersPop";
import RemainPop from "../Popups/RemainPop";
import Adding from "../StudentForms/Adding";
import Avail from "../StudentForms/Avail";
import Failed from "../StudentForms/Failed";
import Inc from "../StudentForms/Inc";
import Lower from "../StudentForms/Lower";
import Others from "../StudentForms/Others";
import Remain from "../StudentForms/Remain";
const ReportCards = () => {
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [fifth, setFifth] = useState(false);
  const [sixth, setSixth] = useState(false);
  const [seventh, setSeventh] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const reportCreate = useSelector((state) => state.reportCreate);
  const { success: successCreate } = reportCreate;

  useEffect(() => {
    dispatch(listReports());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo, successCreate]);

  return (
    <>
      <MainScreen
        title={`Welcome Back ${userInfo.fname} ${userInfo.mname} ${userInfo.lname}`}
      ></MainScreen>
      <div className="container justify-content-center">
        <div className="row">
          <div className="col-sm">
            <h5 className="card-header">Remaining Balance </h5>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setFirst(true)}
              >
                Click here
              </button>

              <RemainPop title="Student form" first={first} setFirst={setFirst}>
                <Remain />
              </RemainPop>
            </div>
            <h5 className="card-header mt-3">Failed a subject </h5>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setFourth(true)}
              >
                Click here
              </button>
              <FailedPop
                title="Student form"
                fourth={fourth}
                setFourth={setFourth}
              >
                <Failed />
              </FailedPop>
            </div>
            <h5 className="card-header mt-3">Adding/Changing </h5>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setSecond(true)}
              >
                Click here
              </button>
              <AddingPop
                title="Student form"
                second={second}
                setSecond={setSecond}
              >
                <Adding />
              </AddingPop>
            </div>
            <h5 className="card-header">Subjects with INC </h5>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setThird(true)}
              >
                Click here
              </button>
              <IncPop title="Student form" third={third} setThird={setThird}>
                <Inc />
              </IncPop>
            </div>
          </div>
          <div className="col-lg mb-5">
            <h5 className="card-header">
              Subjects from lower year level not taken yet{" "}
            </h5>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setFifth(true)}
              >
                Click here
              </button>
              <LowerPop title="Student form" fifth={fifth} setFifth={setFifth}>
                <Lower />
              </LowerPop>
            </div>
            <h5 className="card-header mt-3">
              Subjects that are not available on the current semester not yet
              taken{" "}
            </h5>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setSixth(true)}
              >
                Click here
              </button>
              <AvailPop title="Student form" sixth={sixth} setSixth={setSixth}>
                <Avail />
              </AvailPop>
            </div>
            <h5 className="card-header mt-3">Others</h5>
            <div className="card-body">
              <h5 className="card-title">Special title treatment</h5>
              <p className="card-text">
                With supporting text below as a natural lead-in to additional
                content.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => setSeventh(true)}
              >
                Click here
              </button>
              <OthersPop
                title="Student form"
                seventh={seventh}
                setSeventh={setSeventh}
              >
                <Others />
              </OthersPop>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCards;

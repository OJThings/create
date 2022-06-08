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
import {
  ServicesIcon,
  ServicesCard,
  ServicesH2,
  ServicesContainer,
} from "./ReportCardsElements";
import remain from "../../images/remain.svg";
import adding from "../../images/adding.svg";
import incomplete from "../../images/incomplete.svg";
import failed from "../../images/failed.svg";
import not from "../../images/not.svg";
import avail from "../../images/avail.svg";
import other from "../../images/other.svg";
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
      <ServicesContainer>
        <div className="row">
          <div className="col-sm">
            <ServicesCard>
              <ServicesIcon src={remain}></ServicesIcon>

              <div className="tiles">
                <ServicesH2>Remaining Balance</ServicesH2>
                <button
                  className="btn btn-primary"
                  onClick={() => setFirst(true)}
                >
                  Click here
                </button>

                <RemainPop
                  title="Student form"
                  first={first}
                  setFirst={setFirst}
                >
                  <Remain />
                </RemainPop>
              </div>
            </ServicesCard>

            <ServicesCard>
              <div className="tiles">
                <ServicesIcon src={incomplete}></ServicesIcon>
                <ServicesH2>Subjects with INC</ServicesH2>
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
            </ServicesCard>
          </div>
          <div className="col-sm">
            <ServicesCard>
              <div className="tiles">
                <ServicesIcon src={failed}></ServicesIcon>
                <ServicesH2>Failed Subject</ServicesH2>
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
            </ServicesCard>
            <ServicesCard>
              <ServicesIcon src={not}></ServicesIcon>
              <div className="tiles">
                <ServicesH2>
                  Subjects from lower year level not taken yet
                </ServicesH2>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => setFifth(true)}
              >
                Click here
              </button>
              <LowerPop title="Student form" fifth={fifth} setFifth={setFifth}>
                <Lower />
              </LowerPop>
            </ServicesCard>
          </div>
          <div className="col-sm">
            <ServicesCard>
              <div className="tiles">
                <ServicesIcon src={adding}></ServicesIcon>
                <ServicesH2>Adding/Changing</ServicesH2>
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
            </ServicesCard>
            <ServicesCard>
              <ServicesIcon src={avail}></ServicesIcon>
              <div className="tiles">
                <ServicesH2>
                  Subjects that are not available on the current semester not
                  yet taken{" "}
                </ServicesH2>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => setSixth(true)}
              >
                Click here
              </button>
              <AvailPop title="Student form" sixth={sixth} setSixth={setSixth}>
                <Avail />
              </AvailPop>
            </ServicesCard>
          </div>
        </div>
      </ServicesContainer>
    </>
  );
};

export default ReportCards;

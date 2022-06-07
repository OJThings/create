import React, { useState, useEffect } from "react";
import { FaSignInAlt, FaUserPlus, FaChalkboard } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Video from "../../videos/video.mp4";
import { useDispatch, useSelector } from "react-redux";
import { listReports } from "../../actions/reportActions";
import {
  ArrowForward,
  ArrowRight,
  HeroBg,
  HeroContainer,
  HeroContent,
  VideoBg,
} from "./HomePageElements";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };
  useEffect(() => {
    dispatch(listReports());
    if (!userInfo) {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);
  return (
    <>
      <div>
        <HeroContainer>
          <HeroBg>
            <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
          </HeroBg>
          <HeroContent>
            <div className="row justify-content-center">
              <div className="col-md-8 mt-9">
                <h1 className="display-4 fw-bolder mb-4 text-center text-white">
                  Feels the Easiest Reporting System
                </h1>
                <p className="lead text-center fs-4 mb-5 text-white">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Natus quasi ipsam suscipit eaque quibusdam. Molestiae quasi
                  officia vel impedit rem.
                </p>
                <div className="buttons d-flex justify-content-center">
                  <Link
                    onMouseEnter={onHover}
                    onMouseLeave={onHover}
                    to="/cards"
                    className="btn btn-light me-4 rounded-pill px-4 py-2"
                  >
                    <FaSignInAlt />
                    &nbsp; Create Report{" "}
                    {hover ? <ArrowForward /> : <ArrowRight />}
                  </Link>
                  &nbsp;&nbsp;
                  <Link
                    to="/myreports"
                    className="btn btn-outline-light rounded-pill px-4 py-2"
                  >
                    <FaChalkboard/>
                    &nbsp; My reports
                  </Link>
                </div>
              </div>
            </div>
          </HeroContent>
        </HeroContainer>
      </div>
    </>
  );
}

export default HomePage;

import React, { useState } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Video from "../../videos/video.mp4";
import {
  ArrowForward,
  ArrowRight,
  HeroBg,
  HeroContainer,
  HeroContent,
  VideoBg,
} from "./LandingPageElements";

function LandingPage() {
  
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

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
                    to="/signin"
                    className="btn btn-light me-4 rounded-pill px-4 py-2"
                  >
                    <FaSignInAlt />
                    &nbsp; Sign in {hover ? <ArrowForward /> : <ArrowRight />}
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-outline-light rounded-pill px-4 py-2"
                  >
                    <FaUserPlus />
                    &nbsp; Sign up
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

export default LandingPage;

import React from "react";
import Icon1 from "../images/svg-1.svg"
import Icon2 from "../images/svg-2.svg";
import Icon3 from "../images/svg-3.svg";
import {
  ServicesContainer,
  ServicesH1,
  ServicesWrapper,
  ServicesCard,
  ServicesIcon,
  ServicesH2,
  ServicesP,
} from "./ServicesElements";

const Services = () => {
  return (
    <>
      <ServicesContainer id="services">
        <ServicesH1>Our Services</ServicesH1>
        <ServicesWrapper>
          <ServicesCard>
            <ServicesIcon to="/NewReport" src={Icon1} />
            <ServicesH2>Reduce problems</ServicesH2>
            <ServicesP>We help reduce your fees</ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon2} />
            <ServicesH2>Virtual Report</ServicesH2>
            <ServicesP>
              You can access our platform online anywhere in the world
            </ServicesP>
          </ServicesCard>
          <ServicesCard>
            <ServicesIcon src={Icon3} />
            <ServicesH2>Premuim</ServicesH2>
            <ServicesP>We help reduce your problems</ServicesP>
          </ServicesCard>
        </ServicesWrapper>
      </ServicesContainer>
    </>
  );
};

export default Services;
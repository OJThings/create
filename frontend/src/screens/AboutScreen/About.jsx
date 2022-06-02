import React from "react";
import './About'
import about from '../../images/about.svg'
const About = () => {
  return (
    <>
      <div className="container">
        <section id="about">
          <div className="containers my-5 py-5 mt-5 ">
            <div className="row mt-5 mb-5">
              <div className="col-md-6">
                <img src={about} alt="About" className="w-75 mt-5 " />
              </div>
              <div className="col-md-6">
                <h3 className="fs-5 mb-0">About Us</h3>
                <h1 className="display-6 mb-2">
                  Who <b>We </b>Are
                </h1>
                <hr className="w-50 " />
                <p className="lead mb-4">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga
                  sunt voluptas illum laudantium nihil ipsum. Saepe provident
                  cum vel deleniti placeat soluta fugit, quisquam quasi hic,
                  autem quos dignissimos quo ea. Tempora voluptatem porro ipsa
                  iste totam reprehenderit vitae, quibusdam quod amet.
                  Consequatur nisi commodi dolor cum enim, quam dolores.
                </p>
                <button className="btn btn-dark rounded-pill px-4 py-2">
                  Get Started
                </button>
                <button className="btn btn-outline-dark rounded-pill px-4 py-2 ms-2">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default About;

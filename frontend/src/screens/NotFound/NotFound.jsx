import React from "react";
import notfound from '../../images/notfound.svg'
const NotFound = () => {
  return (
    <div className="container mt-5 mb-5">
      <img src={notfound} class="rounded mx-auto d-block" alt="..."></img>
    </div>
  );
};

export default NotFound;
import React from "react";
import "./Loader.scss";
import { BiLoader } from "react-icons/bi";

const Loader = () => {
  return (
    <div className="loader_section">
      <div className="loader_icon">
        <BiLoader />
      </div>
    </div>
  );
};

export default Loader;

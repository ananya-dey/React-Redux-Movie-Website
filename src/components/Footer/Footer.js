import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <div className="footer_section">
      <nav className="navbar fixed-bottom navbar-dark bg-dark">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} Made an Movie website app using
            React, Redux Toolkit
          </p>
        </div>
      </nav>
    </div>
  );
};

export default Footer;

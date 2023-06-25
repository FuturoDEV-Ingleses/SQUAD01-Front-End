import React from "react";
import PropTypes from "prop-types";
import { Navbar } from "../../index";
import "./Container.css";

const Container = ({ children, title }) => {
  return (
    <div className="container">
      <Navbar />
      <header>
        <h1 className="container-title">{title}</h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Container;

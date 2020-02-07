import React, { useState, useEffect } from "react";
import "../App.scss";
import axios from "axios";
import { Link } from "react-router-dom";
const Header = ({ path, WPConfig, hideTagline }) => {
  const [siteTitle, setSiteTitle] = useState("Loading...");
  const [siteDescription, setSiteDescription] = useState("...");
  const [isSmall, setSmall] = useState(false);
  useEffect(() => {
    axios
      .get(`${WPConfig.siteURL}wp-json/`)
      .then(res => res.data)
      .then(siteInfo => {
        setSiteTitle(siteInfo.name);
        setSiteDescription(siteInfo.description);
      });
  }, []);
  useEffect(() => {
    if (path !== undefined && path.startsWith("/articles/post")) setSmall(true);
    else setSmall(false);
  }, [path]);
  let addon = isSmall ? " articleIsOpen" : "";
  return (
    <header
      className={siteTitle === "Loading..." ? "loading" : "loaded" + addon}
    >
      <Link to="/" className={isSmall ? "smallHeading" : ""}>
        <h1>{isSmall ? "HU" : siteTitle}</h1>
      </Link>
      {!hideTagline && !isSmall && <p>{siteDescription}</p>}
    </header>
  );
};

export default Header;

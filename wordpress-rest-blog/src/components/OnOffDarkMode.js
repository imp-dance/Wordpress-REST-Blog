import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const OnOffDarkmode = props => {
  const [text, setText] = useState("Darkmode");
  useEffect(() => {
    if (localStorage.getItem("imp-site-dm") === "true") {
      document.body.className = "darkModeBody";
      setText("Lightmode");
    }
  }, []);
  const toggleDM = () => {
    const currentSettings = localStorage.getItem("imp-site-dm") || null;
    console.log(currentSettings);
    if (currentSettings === "true") {
      localStorage.setItem("imp-site-dm", "false");
      document.body.className = "";
      setText("Darkmode");
      props.onChange !== undefined && props.onChange(false);
    } else {
      localStorage.setItem("imp-site-dm", "true");
      document.body.className = "darkModeBody";
      setText("Lightmode");
      props.onChange !== undefined && props.onChange(true);
    }
  };
  return (
    <div role="button" className="onOffDM" onClick={toggleDM}>
      {text}
    </div>
  );
};
OnOffDarkmode.propTypes = {
  onChange: PropTypes.func
};
OnOffDarkmode.defaultProps = {
  onChange: () => {}
};
export default OnOffDarkmode;

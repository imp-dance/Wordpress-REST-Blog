import React from "react";
import WPConfig from "../WordpressConfig";
import Articles from "../components/Articles/Articles";
import "../App.scss";

function Index() {
  return (
    <React.Fragment>
      <Articles WPConfig={WPConfig}></Articles>
    </React.Fragment>
  );
}

export default Index;

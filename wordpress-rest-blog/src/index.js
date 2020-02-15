import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import WPConfig from "./WordpressConfig";

const Application = () => {
  return (
    <BrowserRouter
      basename={WPConfig.baseName}
      onUpdate={() => window.scrollTo(0, 0)}
    >
      <App />
    </BrowserRouter>
  );
};
const root = document.getElementById("root");
if (root.hasChildNodes()) {
  ReactDOM.hydrate(<Application />, root);
} else {
  ReactDOM.render(<Application />, root);
}

serviceWorker.unregister();

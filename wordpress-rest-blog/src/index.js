import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

const Application = () => {
  return (
    <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
      <App />
    </HashRouter>
  );
};
const root = document.getElementById("root");
if (root.hasChildNodes()) {
  ReactDOM.hydrate(<Application />, root);
} else {
  ReactDOM.render(<Application />, root);
}

serviceWorker.unregister();

import React from "react";
import ReactDOM from "react-dom";
import Animation from "./Animation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Animation />, div);
});

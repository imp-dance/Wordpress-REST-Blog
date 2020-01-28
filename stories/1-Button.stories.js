import React from "react";
import { action } from "@storybook/addon-actions";
import { Button } from "@storybook/react/demo";

export default {
  title: "Button"
};

class Test extends React.Component {
  render() {
    return <div>Hey!</div>;
  }
}

export const Div = new Test();

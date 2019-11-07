import React from "react";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import WordpressConfig from "../WordpressConfig";
class Header extends React.Component {
  componentDidMount() {
    axios
      .get(`${this.props.WPConfig.siteURL}wp-json/`)
      .then(res => res.data)
      .then(siteInfo => {
        this.setState({
          siteTitle: siteInfo.name,
          siteDescription: siteInfo.description
        });
      });
  }
  state = {
    siteTitle: "Loading...",
    siteDescription: "..."
  };
  render() {
    return (
      <header
        className={this.state.siteTitle === "Loading..." ? "loading" : "loaded"}
      >
        <Link to={WordpressConfig.baseName}>
          <h1>{this.state.siteTitle}</h1>
        </Link>
        <p>{this.state.siteDescription}</p>
      </header>
    );
  }
}

export default Header;

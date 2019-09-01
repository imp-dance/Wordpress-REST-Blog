import React from "react";
import "../App.css";
import axios from "axios";
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
  goToIndex = () => {
    window.location.href = "/";
  };
  render() {
    return (
      <header>
        <h1 onClick={this.goToIndex}>{this.state.siteTitle}</h1>
        <p>{this.state.siteDescription}</p>
      </header>
    );
  }
}

export default Header;

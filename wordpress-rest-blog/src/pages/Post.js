import React from "react";
import WPConfig from "../WordpressConfig";
import Articles from "../components/Articles";
import "../App.css";

class Post extends React.Component {
  state = {
    postID: this.props.match.params.postID || null
  };
  render() {
    return (
      <React.Fragment>
        <Articles WPConfig={WPConfig} postID={this.state.postID}></Articles>
      </React.Fragment>
    );
  }
}

export default Post;

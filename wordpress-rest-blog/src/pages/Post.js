import React from "react";
import WPConfig from "../WordpressConfig";
import Articles from "../components/Articles/Articles";
import "../App.scss";

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

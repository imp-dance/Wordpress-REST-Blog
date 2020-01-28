import React from "react";
import "../App.scss";
import axios from "axios";
class Header extends React.Component {
  componentDidMount() {}
  state = {
    errorMessage: "",
    showError: false,
    commentEmail: "",
    commentName: "",
    commentContent: ""
  };
  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  validateEmail = email => {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  postNewComment = () => {
    this.setState({ showError: false });
    let { commentEmail, commentName, commentContent } = this.state;
    let data = {
      author_name: commentName,
      author_email: commentEmail,
      content: commentContent,
      post: this.props.postID
    };
    if (this.props.replyTo !== null) {
      data.parent = this.props.replyTo;
    }
    let config = {
      headers: { "Content-Type": "application/json" }
    };
    // Validate user input
    let errors = 0;
    let errorMessage = "";
    if (!this.validateEmail(commentEmail)) {
      errors++;
      errorMessage = "Please enter a valid email address";
    }
    if (commentName.length < 3) {
      errors++;
      errorMessage = "Name needs to be atleast three characters";
    }
    if (commentContent.length < 10) {
      errors++;
      errorMessage = "Comment needs to be atleast 10 characters";
    }
    if (errors === 0) {
      axios
        .post(
          `${this.props.WPConfig.siteURL}wp-json/wp/v2/comments`,
          data,
          config
        )
        .then(res => res.data)
        .then(data => {
          let currentCommentState = this.props.comments;
          let newCommentState = data;
          newCommentState.customStatus = "pending";
          newCommentState = currentCommentState.unshift(newCommentState);
          this.setState({
            comments: newCommentState,
            commentEmail: "",
            commentName: "",
            commentContent: ""
          });
          if (this.props.onUpdate !== null) {
            this.props.onUpdate(newCommentState);
          }
        });
    } else {
      this.setState({ showError: true, errorMessage });
    }
  };
  render() {
    return (
      <div className="comment-poster" key={9996}>
        {this.state.showError && (
          <div className="comment-poster-error">{this.state.errorMessage}</div>
        )}
        <table>
          <tbody valign="top">
            <tr>
              <td>Your email: </td>
              <td>
                <input
                  type="email"
                  name="commentEmail"
                  onChange={this.onChange}
                  value={this.state.commentEmail}
                />
              </td>
            </tr>
            <tr>
              <td>Your name: </td>
              <td>
                <input
                  type="text"
                  name="commentName"
                  onChange={this.onChange}
                  value={this.state.commentName}
                />
              </td>
            </tr>
            <tr>
              <td>Comment: </td>
              <td>
                <textarea
                  name="commentContent"
                  onChange={this.onChange}
                  value={this.state.commentContent}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button onClick={this.postNewComment}>Submit comment</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Header;

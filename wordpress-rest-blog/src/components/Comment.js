import React from "react";
import ReactDOMServer from "react-dom/server";
import CommentPoster from "./CommentPoster";
import WPConfig from "../WordpressConfig";
import "../App.css";
const HtmlToReactParser = require("html-to-react").Parser;

class Comment extends React.Component {
  state = {
    isReplying: false
  };
  showReply = () => {
    this.setState({ isReplying: !this.state.isReplying });
  };
  reactParse = parse => {
    let HTMLToReactParser = new HtmlToReactParser();
    let reactElement = HTMLToReactParser.parse(parse);
    return ReactDOMServer.renderToStaticMarkup(reactElement);
  };
  parseDate = date => {
    let y = date.substring(0, 4);
    let m = date.substring(5, 7);
    let d = date.substring(8, 10);
    let h = date.substring(11, 13);
    let min = date.substring(14, 16);
    return `${h}:${min} ${d}/${m}/${y}`;
  };
  commentWasPosted = newCommentState => {
    if (this.props.onUpdate !== undefined) {
      this.props.onUpdate(newCommentState);
    }
    this.setState({ isReplying: false });
  };
  render() {
    let name = this.props.comment.author_name;
    let body = this.reactParse(this.props.comment.content.rendered);
    let date = this.parseDate(this.props.comment.date);
    let img = this.props.comment.author_avatar_urls[48];
    let nestedComments = this.props.nestedComments;
    let nestedCommentsArray = [];
    if (nestedComments.length >= 1) {
      nestedComments.forEach((comment, index) => {
        let allComments = this.props.allComments;
        let replyID = comment.id;
        let moreNestedComments = allComments.filter(
          comment => comment.parent === replyID
        );
        nestedCommentsArray.push(
          <Comment
            key={index}
            comment={comment}
            index={index}
            onUpdate={this.commentWasPosted}
            nestedComments={moreNestedComments}
            allComments={allComments}
          />
        );
      });
    }
    let commentClassName =
      this.props.comment.customStatus === "pending"
        ? "comment pending"
        : "comment";
    return (
      <div className={commentClassName} key={this.props.index}>
        <div className="comment-header">
          <img src={img} alt="Comment avatar" />
          <strong className="comment-username">
            {this.props.comment.author === 1 && <span>★</span>}
            {name}
          </strong>
          <em>#{this.props.comment.id}</em>
        </div>

        <div
          className="comment-body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <i className="comment-date">
          <button onClick={this.showReply}>
            {this.state.isReplying ? "Cancel" : "Reply"}
          </button>{" "}
          {date}
        </i>
        {this.state.isReplying && (
          <CommentPoster
            replyTo={this.props.comment.id}
            postID={this.props.comment.post}
            onUpdate={this.commentWasPosted}
            WPConfig={WPConfig}
            comments={this.props.allComments}
          />
        )}
        {nestedComments.length >= 1 && (
          <div className="nestedComments">{nestedCommentsArray}</div>
        )}
      </div>
    );
  }
}

export default Comment;

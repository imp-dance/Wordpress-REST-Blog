import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import CommentPoster from "./CommentPoster";
import WPConfig from "../WordpressConfig";
import "../App.css";
const HtmlToReactParser = require("html-to-react").Parser;

export const Comment = props => {
  const [isReplying, setReplying] = useState(false);
  const showReply = () => {
    setReplying(!isReplying);
  };
  const reactParse = parse => {
    let HTMLToReactParser = new HtmlToReactParser();
    let reactElement = HTMLToReactParser.parse(parse);
    return ReactDOMServer.renderToStaticMarkup(reactElement);
  };
  const parseDate = date => {
    let y = date.substring(0, 4);
    let m = date.substring(5, 7);
    let d = date.substring(8, 10);
    let h = date.substring(11, 13);
    let min = date.substring(14, 16);
    return `${h}:${min} ${d}/${m}/${y}`;
  };
  const commentWasPosted = newCommentState => {
    if (props.onUpdate !== undefined) {
      props.onUpdate(newCommentState);
    }
    setReplying(false);
  };
  let name = props.comment.author_name;
  let body = reactParse(props.comment.content.rendered);
  let date = parseDate(props.comment.date);
  let img = props.comment.author_avatar_urls[48];
  let nestedComments = props.nestedComments;
  let nestedCommentsArray = [];
  if (nestedComments.length >= 1) {
    nestedComments.forEach((comment, index) => {
      let allComments = props.allComments;
      let replyID = comment.id;
      let moreNestedComments = allComments.filter(
        comment => comment.parent === replyID
      );
      nestedCommentsArray.push(
        <Comment
          key={index}
          comment={comment}
          index={index}
          onUpdate={commentWasPosted}
          nestedComments={moreNestedComments}
          allComments={allComments}
        />
      );
    });
  }
  let commentClassName =
    props.comment.customStatus === "pending" ? "comment pending" : "comment";
  return (
    <div className={commentClassName} key={props.index}>
      <div className="comment-header">
        <img src={img} alt="Comment avatar" />
        <strong className="comment-username">
          {props.comment.author === 1 && <span>★</span>}
          {name}
        </strong>
        <em>#{props.comment.id}</em>
      </div>

      <div
        className="comment-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <i className="comment-date">
        {props.comment.customStatus !== "pending" && (
          <button onClick={showReply}>{isReplying ? "Cancel" : "Reply"}</button>
        )}
        {date}
      </i>
      {isReplying && (
        <CommentPoster
          replyTo={props.comment.id}
          postID={props.comment.post}
          onUpdate={commentWasPosted}
          WPConfig={WPConfig}
          comments={props.allComments}
        />
      )}
      {nestedComments.length >= 1 && (
        <div className="nestedComments">{nestedCommentsArray}</div>
      )}
    </div>
  );
};

export default Comment;

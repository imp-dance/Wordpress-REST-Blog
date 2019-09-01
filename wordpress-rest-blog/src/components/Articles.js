import React from "react";
import ReactDOMServer from "react-dom/server";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
const HtmlToReactParser = require("html-to-react").Parser;

class Articles extends React.Component {
  state = {
    blogPosts: [
      {
        id: 0,
        title: { rendered: "" },
        excerpt: { rendered: "" },
        content: { rendered: "" }
      }
    ],
    postID: this.props.postID || false
  };
  componentDidMount() {
    if (this.state.postID === false) {
      axios
        .get(`${this.props.WPConfig.siteURL}wp-json/wp/v2/posts`)
        .then(res => res.data)
        .then(blogPosts => {
          this.setState({
            blogPosts: blogPosts
          });
        });
    } else {
      axios
        .get(
          `${this.props.WPConfig.siteURL}wp-json/wp/v2/posts/?include[]=${this.state.postID}`
        )
        .then(res => res.data)
        .then(blogPosts => {
          this.setState({
            blogPosts: blogPosts
          });
        });
    }
  }
  reactParse = parse => {
    let HTMLToReactParser = new HtmlToReactParser();
    let reactElement = HTMLToReactParser.parse(parse);
    return ReactDOMServer.renderToStaticMarkup(reactElement);
  };
  render() {
    let render = [];
    this.state.blogPosts.forEach((blogPost, index) => {
      let title = this.reactParse(blogPost.title.rendered);
      let body =
        this.state.postID === false
          ? this.reactParse(blogPost.excerpt.rendered)
          : this.reactParse(blogPost.content.rendered);
      if (this.state.postID === false) {
        body = body.substring(0, body.length - 9) + "...</p>";
      }
      let className = this.state.postID === false ? "collapsed" : "open";
      render.push(
        <article key={index} className={className}>
          <Link to={"/post/" + blogPost.id} className="articleLink">
            <h3
              dangerouslySetInnerHTML={{
                __html: title
              }}
            ></h3>
          </Link>
          <div
            className="body"
            dangerouslySetInnerHTML={{
              __html: body
            }}
          ></div>
        </article>
      );
    });
    return <main>{render}</main>;
  }
}

export default Articles;

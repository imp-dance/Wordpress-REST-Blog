import React from "react";
import ReactDOMServer from "react-dom/server";
import Comment from "./Comment";
import CommentPoster from "./CommentPoster";
import "../App.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "./Loader";
import {
  FacebookShareButton,
  RedditShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton
} from "react-share";
const HtmlToReactParser = require("html-to-react").Parser;

class Articles extends React.Component {
  state = {
    blogPosts: [
      {
        id: 0,
        title: { rendered: "" },
        excerpt: { rendered: "" },
        content: { rendered: "" },
        categories: []
      }
    ],
    comments: [
      {
        author_name: "",
        content: { rendered: "" },
        author_avatar_urls: { 48: "" },
        date: ""
      }
    ],
    categories: [
      {
        name: "",
        id: null
      }
    ],
    sortArticles: null,
    postID: this.props.postID || false,
    renderComments: false,
    commentEmail: "",
    commentName: "",
    commentContent: "",
    commentReply: null
  };
  componentDidMount() {
    if (this.state.postID === false) {
      axios
        .get(`${this.props.WPConfig.siteURL}wp-json/wp/v2/posts`)
        .then(res => res.data)
        .then(blogPosts => {
          this.setState({
            blogPosts: blogPosts,
            loaded: true
          });
        });
      axios
        .get(`${this.props.WPConfig.siteURL}wp-json/wp/v2/categories`)
        .then(res => res.data)
        .then(categories => {
          this.setState({
            categories: categories
          });
        });
      this.scrollToTop();
    } else {
      axios
        .get(
          `${this.props.WPConfig.siteURL}wp-json/wp/v2/posts/?include[]=${this.state.postID}`
        )
        .then(res => res.data)
        .then(blogPosts => {
          this.setState(
            {
              blogPosts: blogPosts,
              loaded: true
            },
            () => {
              setTimeout(this.checkForForm, 1500);
            }
          );
        });
      axios
        .get(
          `${this.props.WPConfig.siteURL}wp-json/wp/v2/comments/?post=${this.state.postID}`
        )
        .then(res => res.data)
        .then(comments => {
          this.setState({
            comments: comments
          });
        });
      this.scrollToTop();
    }
  }
  checkForForm = () => {
    let form = document.querySelector(".wpforms-form");
    if (form !== null) {
      form.setAttribute(
        "action",
        "https://impedans.me/" + form.getAttribute("action")
      );
      console.log("Updated form");
    }
  };
  goToArticle = event => {
    window.location.href = `${
      this.props.WPConfig.baseName
    }post/${event.target.parentElement.getAttribute("data-id")}`;
  };
  sortArticles = event => {
    let categoryID = event.target.getAttribute("data-categoryid");
    this.setState({ sortArticles: categoryID });
    this.scrollToTop();
  };
  scrollToTop = () => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  };
  reactParse = parse => {
    let HTMLToReactParser = new HtmlToReactParser();
    let reactElement = HTMLToReactParser.parse(parse);
    let string = ReactDOMServer.renderToStaticMarkup(reactElement);
    return string.replace("<code>", "<code class='markUpBaby'>");
  };
  parseDate = date => {
    let y = date.substring(0, 4);
    let m = date.substring(5, 7);
    let d = date.substring(8, 10);
    let h = date.substring(11, 13);
    let min = date.substring(14, 16);
    return `${h}:${min} ${d}/${m}/${y}`;
  };
  updateComments = newCommentState => {
    this.setState({ newComments: newCommentState });
  };
  goToMusic = () => {
    window.location.href = "/blog/post/128";
  };
  goToAbout = () => {
    window.location.href = "/blog/post/136";
  };
  goToCV = () => {
    window.open("https://haakon.underbakke.net/cv", "_blank");
  };
  goToContact = () => {
    window.location.href = "https://impedans.me/web/contact-me/";
  };
  ignoreAction = event => {
    event.preventDefault();
  };
  goHome = () => {
    window.location.href = "/articles";
  };
  render() {
    let render = [];
    let categoryItems = [];
    this.state.categories.forEach((category, index) => {
      if (category.id !== 1) {
        categoryItems.push(
          <li key={"art" + 1888 + index} data-id={category.id}>
            <button
              onClick={this.sortArticles}
              data-categoryid={category.id}
              className={
                this.state.sortArticles === null ||
                parseInt(this.state.sortArticles) === parseInt(category.id)
                  ? "white"
                  : "gray"
              }
            >
              {category.name}
            </button>
          </li>
        );
      }
    });
    if (this.state.postID !== false) {
      categoryItems.push(
        <li key={"fart" + 1923}>
          <Link to="/articles">
            <button>&#8249; Articles & Projects</button>
          </Link>
        </li>
      );
    } /* 
    categoryItems.push(
      <li key={"bart" + 1923} className="seperator">
        |
      </li>
    ); */
    render.push(
      <nav key={"part" + 9991}>
        <ul>
          {categoryItems}
          {/* 
          <li>
            <Link to="/post/128">
              <button
                onClick={
                  this.state.postID !== false
                    ? this.goToMusic
                    : this.ignoreAction
                }
              >
                Music
              </button>
            </Link>
          </li>
          <li>
            <Link to="/post/136">
              <button
                onClick={
                  this.state.postID !== false
                    ? this.goToAbout
                    : this.ignoreAction
                }
              >
                About
              </button>
            </Link>
          </li>
          <li>
            <button onClick={this.goToContact}>Contact</button>
          </li>
          <li>
            <button onClick={this.goToCV}>CV</button>
          </li> */}
        </ul>
      </nav>
    );
    this.state.blogPosts.forEach((blogPost, index) => {
      if (
        this.state.sortArticles === null ||
        blogPost.categories.includes(parseInt(this.state.sortArticles)) ||
        blogPost.categories === parseInt(this.state.sortArticles)
      ) {
        let title = this.reactParse(blogPost.title.rendered);
        let body =
          this.state.postID === false
            ? this.reactParse(blogPost.excerpt.rendered)
            : this.reactParse(blogPost.content.rendered);
        if (this.state.postID === false) {
          body = body.substring(0, body.length - 9) + "...</p>";
        }
        let className = this.state.postID === false ? "collapsed" : "open";
        /*if (index === 0 && this.state.sortArticles === null) {
          className = "open"; // Latest article should be open on index
          body = this.reactParse(blogPost.content.rendered);
        }*/
        if (
          (this.state.postID === false && !blogPost.categories.includes(1)) ||
          this.state.postID !== false
        ) {
          render.push(
            <article key={index} className={className} data-id={blogPost.id}>
              <Link
                to={"/articles/post/" + blogPost.id}
                data-id={blogPost.id}
                className="articleLink"
              >
                <h3
                  data-id={blogPost.id}
                  dangerouslySetInnerHTML={{
                    __html: title
                  }}
                ></h3>
              </Link>
              {this.state.postID === false ? (
                <Link
                  to={"/articles/post/" + blogPost.id}
                  data-id={blogPost.id}
                  className="articleBodyLink"
                >
                  <div
                    className="body"
                    data-id={blogPost.id}
                    dangerouslySetInnerHTML={{
                      __html: body
                    }}
                  ></div>
                </Link>
              ) : (
                <div
                  className="body"
                  onClick={
                    this.state.postID === false ? this.goToArticle : () => {}
                  }
                  data-id={blogPost.id}
                  dangerouslySetInnerHTML={{
                    __html: body
                  }}
                ></div>
              )}
            </article>
          );
        }
      }
    });
    if (this.state.postID !== false) {
      // A specific post is open
      if (this.state.blogPosts[0].title.rendered !== "") {
        let metaDescription = this.reactParse(
          this.state.blogPosts[0].excerpt.rendered
        );
        metaDescription = metaDescription.substring(3);
        metaDescription = metaDescription.slice(0, -5);
        let title = this.reactParse(this.state.blogPosts[0].title.rendered);
        render.push(
          <Helmet key="123653">
            <title>{title}</title>
            <meta name="description" content={metaDescription} />
          </Helmet>
        );
      }
      let parentComments = this.state.comments.filter(
        comment => comment.parent === 0
      );
      let url = window.location.href;
      render.push(<h5 key={"aaart" + 9994}>Share on...</h5>);
      render.push(
        <div className="social" key={"arts" + 9993}>
          <FacebookShareButton url={url}>Facebook</FacebookShareButton>
          <RedditShareButton url={url}>Reddit</RedditShareButton>
          <LinkedinShareButton url={url}>Linkedin</LinkedinShareButton>
          <TwitterShareButton url={url}>Twitter</TwitterShareButton>
          <EmailShareButton url={url}>Email</EmailShareButton>
        </div>
      );
      if (!this.state.blogPosts[0].categories.includes(1)) {
        if (this.state.comments.length === 1) {
          render.push(<h4 key={"bbbbart" + 9999}>1 Comment</h4>);
        } else if (this.state.comments.length === 0) {
          render.push(
            <h4 key={"bbbart" + 9999}>Be the first to leave a comment</h4>
          );
        } else {
          render.push(
            <h4 key={"bbart" + 9999}>{this.state.comments.length} Comments</h4>
          );
        }
        render.push(
          <CommentPoster
            postID={this.state.postID}
            onUpdate={this.updateComments}
            key={9991}
            WPConfig={this.props.WPConfig}
            comments={this.state.comments}
          />
        );
        let comments = [];
        parentComments.forEach((comment, index) => {
          let parentID = comment.id;
          let nestedComments = this.state.comments.filter(
            comment => comment.parent === parentID
          );
          comments.push(
            <Comment
              comment={comment}
              index={index}
              key={index}
              onUpdate={this.updateComments}
              nestedComments={nestedComments}
              allComments={this.state.comments}
            />
          );
        });
        render.push(
          <div className="comments-container" key={9998}>
            {comments}
          </div>
        );
      }
    } else {
      render.push(
        <Helmet key="123653">
          <title>Håkon Underbakke - Articles</title>
          <meta
            name="description"
            content={"Web development & design articles."}
          />
        </Helmet>
      );
    }
    return (
      <React.Fragment>
        {!this.state.loaded && (
          <main className="showLoading">
            <Loader />
          </main>
        )}
        <main className={this.state.loaded ? "loaded" : "loading"}>
          {render}
        </main>
      </React.Fragment>
    );
  }
}

export default Articles;

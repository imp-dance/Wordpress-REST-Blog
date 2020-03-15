import React from "react";
import ReactDOMServer from "react-dom/server";
import Comment from "../Comment";
import CommentPoster from "../CommentPoster";
import "../../App.scss";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Loader from "../Loader";
import hljs from "highlight.js";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {
  FacebookShareButton,
  RedditShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton
} from "react-share";
const HtmlToReactParser = require("html-to-react").Parser;
function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}
function selectText(node) {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange();
    range.moveToElementText(node);
    range.select();
  } else if (window.getSelection) {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection.removeAllRanges();
    selection.addRange(range);
  } else {
    console.warn("Could not select text in node: Unsupported browser.");
  }
}

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
        .get(`${this.props.WPConfig.siteURL}wp-json/wp/v2/posts/?per_page=100`)
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
              this.postPageRendered();
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
  postPageRendered = () => {
    this.checkForForm();
    this.highlightCodes();
    this.makeHeadersNavigable();
  };
  recursiveGetHeaderID = givenID => {
    if (document.querySelector("#" + givenID) !== null) {
      const newID = givenID + "_";
      if (document.querySelector("#" + newID) !== null) {
        return this.recursiveGetHeaderID(newID);
      } else {
        return newID;
      }
    }
    return givenID;
  };
  makeHeadersNavigable = () => {
    const headers = document.querySelectorAll(".body h4");
    headers.forEach(element => {
      let newText = camelize(element.innerText);
      newText = encodeURIComponent(newText.replace("&", "And")).replace(
        "%",
        ""
      );
      const url = window.location.href;
      const splitURL = url.split("#");
      const newURL = splitURL[0] + "#" + splitURL[1];
      newText = this.recursiveGetHeaderID(newText);
      element.innerHTML = `<a href="${newURL}#${newText}" name=${newText} id=${newText}>${element.innerText}</a>`;
      document.querySelector("#" + newText).addEventListener("click", event => {
        event.target.scrollIntoView();
        window.scrollBy(0, -100);
      });
      if (splitURL[2] === newText) {
        element.scrollIntoView();
        window.scrollBy(0, -100);
      }
    });
  };
  highlightCodes = () => {
    const blockCodes = document.querySelectorAll("pre code");
    blockCodes.forEach(block => {
      hljs.highlightBlock(block);
      const lines = block.innerHTML.split("\n");
      const newLines = [];
      lines.forEach(line => {
        newLines.push(`<div class="code-line"> ${line}</div>`);
      });
      block.innerHTML = newLines.join("\n");
    });
    const inlineCodes = document.querySelectorAll("code:not(.hljs)");
    inlineCodes.forEach(code => {
      code.addEventListener("click", () => selectText(code));
    });
  };
  checkForForm = () => {
    let form = document.querySelector(".wpforms-form");
    if (form !== null) {
      form.setAttribute(
        "action",
        "https://impedans.me/" + form.getAttribute("action")
      );
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
  parseDate = (date, showHour = false) => {
    let y = date.substring(0, 4);
    let m = date.substring(5, 7);
    let d = date.substring(8, 10);
    let h = date.substring(11, 13);
    let min = date.substring(14, 16);
    return showHour ? `${h}:${min} ${d}/${m}/${y}` : `${d}/${m}/${y}`;
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
    const afterArticleRender = [];
    const renderArticles = [];
    // First loop through all of the posts
    this.state.blogPosts.forEach((blogPost, index) => {
      if (
        this.state.sortArticles === null ||
        blogPost.categories.includes(parseInt(this.state.sortArticles)) ||
        blogPost.categories === parseInt(this.state.sortArticles)
      ) {
        if (
          (this.state.postID === false && !blogPost.categories.includes(1)) ||
          this.state.postID !== false
        ) {
          renderArticles.push(
            <ArticleBody
              isOnly={this.state.postID !== false}
              blogPost={blogPost}
              key={index}
            />
          );
        }
      }
    });
    if (this.state.postID !== false) {
      // A post is open

      // Here is where you could add after-body content for specific articles
      if (this.state.blogPosts[0].title.rendered !== "") {
        if (this.state.postID === "136") {
          // "About me"-page
          afterArticleRender.push(<ExperienceTimeline />);
        }
      }

      // Let's also show social sharing stuff
      if (this.state.postID !== "136") {
        afterArticleRender.push(this.socialSharingRender());
      }

      if (!this.state.blogPosts[0].categories.includes(1)) {
        // Post is not hidden
        // Let's now render the comments
        afterArticleRender.push(this.commentRender());
      }
    }
    const helmetRender = this.helmetRender();
    return (
      <React.Fragment>
        {helmetRender}
        {!this.state.loaded && (
          <main className="showLoading">
            <Loader />
          </main>
        )}
        <main className={this.state.loaded ? "loaded" : "loading"}>
          <nav key={"part" + 9991}>
            <ul>
              <Categories
                isOnly={this.state.postID !== false}
                categories={this.state.categories}
                sortedArticles={this.state.sortArticles}
                sortArticles={this.sortArticles}
              />
            </ul>
          </nav>
          {renderArticles}
          {this.state.postID !== null && afterArticleRender}
        </main>
      </React.Fragment>
    );
  }
  helmetRender = () => {
    const render = [];
    if (this.state.postID !== false) {
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
    } else {
      // Not a specific post, so we should make sure the meta-info is correct.
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

    return render;
  };
  commentRender = () => {
    const commentRender = [];
    if (this.state.comments.length === 1) {
      commentRender.push(<h4 key={"bbbbart" + 9999}>1 Comment</h4>);
    } else if (this.state.comments.length === 0) {
      commentRender.push(
        <h4 key={"bbbart" + 9999}>Be the first to leave a comment</h4>
      );
    } else {
      commentRender.push(
        <h4 key={"bbart" + 9999}>{this.state.comments.length} Comments</h4>
      );
    }
    //// Comment Poster
    commentRender.push(
      <CommentPoster
        postID={this.state.postID}
        onUpdate={this.updateComments}
        key={9991}
        WPConfig={this.props.WPConfig}
        comments={this.state.comments}
      />
    );
    let comments = [];
    let parentComments = this.state.comments.filter(
      comment => comment.parent === 0
    );
    // Let's first loop through every first-level comment
    parentComments.forEach((comment, index) => {
      let parentID = comment.id;
      let nestedComments = this.state.comments.filter(
        comment => comment.parent === parentID
      ); // Also render whatever nested comments are there
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
    // Pushing comments into "render"
    commentRender.push(
      <div className="comments-container" key={9998}>
        {comments}
      </div>
    );
    return commentRender;
  };
  socialSharingRender = () => {
    const socialRender = [];
    const url = window.location.href;
    if (this.state.postID !== null) {
      socialRender.push(
        <div className="footerDate" key="footerDate">
          P{" "}
          {this.state.blogPosts[0].date !== undefined &&
            this.parseDate(this.state.blogPosts[0].date)}
          <br />U{" "}
          {this.state.blogPosts[0].modified !== undefined &&
            this.parseDate(this.state.blogPosts[0].modified)}
        </div>
      );
    }
    socialRender.push(<h5 key={"aaart" + 9994}>Share on...</h5>);
    socialRender.push(
      <div className="social" key={"arts" + 9993}>
        <FacebookShareButton url={url}>Facebook</FacebookShareButton>
        <RedditShareButton url={url}>Reddit</RedditShareButton>
        <LinkedinShareButton url={url}>Linkedin</LinkedinShareButton>
        <TwitterShareButton url={url}>Twitter</TwitterShareButton>
        <EmailShareButton url={url}>Email</EmailShareButton>
      </div>
    );
    return socialRender;
  };
}

export default Articles;

const ArticleBody = ({ isOnly, blogPost }) => {
  const className = isOnly ? "open" : "collapsed";
  const goToArticle = event => {
    window.location.href = `${
      this.props.WPConfig.baseName
    }post/${event.target.parentElement.getAttribute("data-id")}`;
  };
  const reactParse = parse => {
    let HTMLToReactParser = new HtmlToReactParser();
    let reactElement = HTMLToReactParser.parse(parse);
    let string = ReactDOMServer.renderToStaticMarkup(reactElement);
    return string.replace("<code>", "<code class='markUpBaby'>");
  };
  let title = reactParse(blogPost.title.rendered);
  let body = isOnly
    ? reactParse(blogPost.content.rendered)
    : reactParse(blogPost.excerpt.rendered);
  if (!isOnly) {
    body = body.substring(0, body.length - 9) + "...</p>";
  }
  return (
    <article
      key={`article-${blogPost.id}`}
      className={className}
      data-id={blogPost.id}
    >
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
      {isOnly ? (
        <div
          className="body"
          onClick={!isOnly ? goToArticle : () => {}}
          data-id={blogPost.id}
          dangerouslySetInnerHTML={{
            __html: body
          }}
        ></div>
      ) : (
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
      )}
    </article>
  );
};

const Categories = ({ categories, sortedArticles, isOnly, sortArticles }) => {
  let categoryItems = [];
  categories.forEach((category, index) => {
    if (category.id !== 1) {
      categoryItems.push(
        <li key={"art" + 1888 + index} data-id={category.id}>
          <button
            onClick={sortArticles}
            data-categoryid={category.id}
            className={
              sortedArticles === null ||
              parseInt(sortedArticles) === parseInt(category.id)
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
  if (isOnly) {
    categoryItems.push(
      <li key={"fart" + 1923}>
        <Link to="/articles">
          <button>&#8249; Articles</button>
        </Link>
      </li>
    );
  }
  return categoryItems;
};

const TimeLineElement = ({ title, subTitle, children, date, isWork }) => {
  return (
    <VerticalTimelineElement
      className={
        isWork
          ? "vertical-timeline-element--work"
          : "vertical-timeline-element--education"
      }
      contentStyle={{ background: "#10101f", color: "#fff" }}
      contentArrowStyle={{
        borderRight: isWork ? "7px solid  #10101f" : "7px solid #191931"
      }}
      date={date}
      iconStyle={{ background: "#10101f", color: "#fff" }}
      icon={<i className="material-icons">{isWork ? "work" : "web"}</i>}
    >
      <h3 className="vertical-timeline-element-title">{title}</h3>
      <h4 className="vertical-timeline-element-subtitle">
        {isWork ? (
          subTitle
        ) : (
          <a href={subTitle} target="_blank" rel="noopener noreferrer">
            {subTitle}
          </a>
        )}
      </h4>
      <p>{children}</p>
    </VerticalTimelineElement>
  );
};

const ExperienceTimeline = () => {
  return (
    <>
      <h3>Experience timeline</h3>
      <VerticalTimeline layout="1-column">
        <TimeLineElement
          title="Ryfylke Kranservice AS"
          subTitle="https://ryfylkekranservice.no"
          date="2019"
          isWork={false}
        >
          Designed and developed their new website.
        </TimeLineElement>
        <TimeLineElement
          title="Ida by LIGL"
          subTitle="https://ida.ligl.no"
          date="2019"
          isWork={false}
        >
          Released first major version of Ida by LIGL.
        </TimeLineElement>
        <TimeLineElement
          title="LIGL AS"
          subTitle="Legal Tech Developer"
          date="2016 - Present"
          isWork={true}
        >
          Legal document automation using ContractExpress, web development &
          design with React.js
        </TimeLineElement>
        <TimeLineElement
          title="Eirik Underbakke Portfolio"
          subTitle="https://eirik.underbakke.net"
          date="2015"
          isWork={false}
        >
          Web Developer, IT, Cashier
        </TimeLineElement>
        <TimeLineElement
          title="Ryfylke Bok & IT"
          subTitle="https://bok-it.no"
          date="2014"
          isWork={false}
        >
          Developed their website, also did computer repairs & sales.
        </TimeLineElement>
      </VerticalTimeline>
    </>
  );
};

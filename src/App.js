import React from "react";
import Index from "./pages/Index";
import Post from "./pages/Post";
import Button from "./components/Button";
import Header from "./components/Header";
import Animation from "./components/Animation";
import ScrollToTopRoute from "./components/ScrollToTopRoute";
import Particles from "./components/Particles";
import OnOffDarkmode from "./components/OnOffDarkmode";
import WPConfig from "./WordpressConfig";
import { Helmet } from "react-helmet";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import "./App.scss";
import Context from "./components/Context";

class App extends React.Component {
  state = {
    to: {
      active: false,
      index: false,
      article: false,
      articles: false,
      articleID: null
    },
    dm: false
  };
  scrollToTop = () => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  };
  componentDidMount() {
    if (localStorage.getItem("imp-site-dm") === "true") {
      this.setState({ dm: true });
    }
  }
  changedDM = dm => {
    this.setState({ dm });
  };
  clickedAnimation = () => {
    this.setState({ redirect: "about" });
    setTimeout(() => {
      this.setState({ redirect: null });
    }, 100);
  };
  render() {
    return (
      <Context.Provider dm={this.state.dm}>
        <OnOffDarkmode onChange={this.changedDM} />
        <Router
          basename={WPConfig.baseName}
          onUpdate={() => window.scrollTo(0, 0)}
        >
          <Switch>
            <Route path="/" exact={true}>
              <Helmet>
                <title>Håkon Underbakke</title>
                <meta
                  name="description"
                  content={"Web development & design articles."}
                />
              </Helmet>
              {this.state.redirect === "about" && (
                <Redirect to="/articles/post/136" />
              )}
              <div className="App">
                <div id="particles-js">
                  <Particles />
                  <Header WPConfig={WPConfig} hideTagline={true}></Header>
                  <main
                    className="minHeight center animateIn"
                    style={{ padding: "10px" }}
                  >
                    <p className="underLine">
                      <strong>Web designer</strong>,{" "}
                      <strong>legal tech developer</strong> and{" "}
                      <strong>music producer</strong> currently working for{" "}
                      <strong className="noFlip">
                        <a
                          href="https://ligl.no"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          LIGL AS
                        </a>
                      </strong>
                      .
                    </p>
                    <Animation
                      dm={this.state.dm}
                      onClick={this.clickedAnimation}
                    />
                  </main>
                </div>
                <div className="section-2">
                  <main>
                    <div className="indexLinks">
                      <div>
                        <Link to="/articles">
                          <Button>Articles</Button>
                        </Link>
                      </div>
                      <div>
                        <Link to="/articles/post/136">
                          <Button>More info</Button>
                        </Link>
                      </div>
                      <div>
                        <a href="https://impedans.me/web/contact-me/">
                          <Button>Contact me</Button>
                        </a>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
            </Route>
            <Route path="/articles">
              <div className="App">
                <Header WPConfig={WPConfig}></Header>
                <div className="minHeight">
                  <ScrollToTop>
                    <Switch>
                      <ScrollToTopRoute
                        path="/articles/post/:postID"
                        component={Post}
                      />
                      <Route path="/" exact={true}>
                        <Index></Index>
                      </Route>
                      <Route component={Index} />
                    </Switch>
                  </ScrollToTop>
                </div>
              </div>
              <footer>
                {
                  //eslint-disable-next-line
                  <a href="#">Back to top</a>
                }
              </footer>
            </Route>
          </Switch>
        </Router>
      </Context.Provider>
    );
  }
}
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

export default App;

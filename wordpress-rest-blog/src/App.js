import React from "react";
import Index from "./pages/Index";
import Post from "./pages/Post";
import Header from "./components/Header";
import ScrollToTopRoute from "./components/ScrollToTopRoute";
import WPConfig from "./WordpressConfig";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  scrollToTop = () => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  };
  render() {
    return (
      <React.Fragment>
        <div className="App">
          <Router
            basename={WPConfig.baseName}
            onUpdate={() => window.scrollTo(0, 0)}
          >
            <Header WPConfig={WPConfig}></Header>
            <div className="minHeight">
              <ScrollToTop>
                <Switch>
                  <ScrollToTopRoute path="/post/:postID" component={Post} />
                  <Route path="/" exact={true} component={Index} />
                  <Route component={Index} />
                </Switch>
              </ScrollToTop>
            </div>
          </Router>
        </div>
        <footer>
          {
            //eslint-disable-next-line
            <a href="#">Back to top</a>
          }
        </footer>
      </React.Fragment>
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

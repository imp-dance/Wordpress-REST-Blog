import React from "react";
import Index from "./pages/Index";
import Post from "./pages/Post";
import Header from "./components/Header";
import WPConfig from "./WordpressConfig";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <Header WPConfig={WPConfig}></Header>
        <div className="minHeight">
          <Router>
            <Switch>
              <Route path="/post/:postID" component={Post} />
              <Route path="/" exact={true} component={Index} />
              <Route component={Index} />
            </Switch>
          </Router>
        </div>
      </div>
      <footer>
        <a href="#">Back to top</a>
      </footer>
    </React.Fragment>
  );
}

export default App;

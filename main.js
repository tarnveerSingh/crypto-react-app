import React from 'react';
import './main.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import IndexPage from './pages/IndexPage';

import TrendingPage from './pages/trendingPage';

function App() {
  return (
    <Router>
      {/* <div class="button-7">
    <div class="eff-7"></div>
    <a href="#"> Touch me </a>
  </div> */}
      <div className="coin-app">
        <div className="wrapper">
          <button
            className="button"
            style={{
              fontSize: '35px',
              margin: '0px 100px 15px 100px',
            }}
          >
            <Link to={'/'}>Home</Link>
          </button>
          <button
            className="button"
            style={{
              fontSize: '35px',
              margin: '0px 100px 0 100px',
            }}
          >
            <Link to={'/trending'}>Trending</Link>
          </button>
        </div>

        <Switch>
          <Route exact path="/">
            <IndexPage />
          </Route>
          <Route exact path="/trending">
            <TrendingPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

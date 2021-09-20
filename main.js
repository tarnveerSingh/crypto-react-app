import React from 'react';
import './main.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import TrendingPage from './pages/trendingPage';

function App() {
  return (
    <Router>
      <div className="coin-app">
        <div className="wrapper">
          <button className="button">
            <Link to={'/'}>Home</Link>
          </button>
          <button className="button">
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

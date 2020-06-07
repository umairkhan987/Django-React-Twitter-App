import React from 'react';
import { Route, Switch } from "react-router-dom";
import './App.css';
import TweetList from './components/TweetList';
import Login from './components/login';
import TweetDetail from './components/tweetDetail';
import NavBar from './components/navbar';

function App() {

  return (
    <React.Fragment>
      <NavBar />
      <div className="container">
        <h1 className="text-center">Welcome to tweet me!</h1>
        <Switch>
          <Route path="/tweet/detail/:id" component={TweetDetail} />
          {/* <Route path="/tweet-detail/:id" render={(props) => <TweetDetail {...props} />} /> */}
          <Route path="/login" component={Login} />
          <Route path="/" exact component={TweetList} />
          {/* <Redirect from="/tweets" exact to="/" /> */}
        </Switch>
      </div>
    </React.Fragment>
  );
}

export default App;

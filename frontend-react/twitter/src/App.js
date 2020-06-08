import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import './App.css';
import TweetList from './components/TweetList';
import TweetDetail from './components/tweetDetail';
import NavBar from './components/navbar';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import NotFound from './components/notFound';
import { getCurrentUser } from './services/authService';
import Logout from './components/logout';

class App extends Component {
  state = {};

  async componentDidMount() {
    const data = await getCurrentUser();
    if (data !== null) {
      this.setState({ user: data });
    }
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <div className="container">
          {/* <h1 className="text-center">Welcome to tweet me!</h1> */}
          <Switch>
            <Route path="/tweets/:id" component={TweetDetail} />
            {/* <Route path="/tweet-detail/:id" render={(props) => <TweetDetail {...props} />} /> */}
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={SignupForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/tweets" exact component={TweetList} />
            <Redirect from="/" exact to="/tweets" />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;

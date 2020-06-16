import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import "react-toastify/dist/ReactToastify.css";
import TweetList from './components/TweetList';
import TweetDetail from './components/tweetDetail';
import NavBar from './components/navbar';
import LoginForm from './components/loginForm';
import SignupForm from './components/signupForm';
import NotFound from './components/notFound';
import { getCurrentUser } from './services/authService';
import Logout from './components/logout';
import ProfileForm from './components/profileForm';
import OtherUserTweet from './components/otherUserTweet';

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
        <ToastContainer />
        <NavBar user={user} />
        <div className="container">
          {/* <h1 className="text-center">Welcome to tweet me!</h1> */}
          <Switch>
            {/* <Route path="/tweets/feed" component={FeedTweet} /> */}
            <Route path="/tweets/profile/:username" component={OtherUserTweet} />
            <Route path="/tweets/:id" exact component={TweetDetail} />
            {/* <Route path="/tweet-detail/:id" render={(props) => <TweetDetail {...props} />} /> */}
            <Route path="/profile" component={ProfileForm} />
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

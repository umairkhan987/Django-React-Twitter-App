import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tweetAction } from "../services/tweetService";
import { UserPicture, UserDisplay } from "./profileComponenet";
import { toast } from "react-toastify";

export const ActionBtn = (props) => {
  const { tweet, action, handleAction } = props;
  const className = props.className ? props.className : "btn btn-primary";
  const actionDisplay = action.display ? action.display : "Action";
  const display =
    action.type === "like" ? `${tweet.likes} ${actionDisplay}` : actionDisplay;
  return (
    <button
      onClick={() => handleAction(tweet, action.type)}
      className={className}
    >
      {display}
    </button>
  );
};

const ParentTweet = ({ tweet, handleAction, retweeter }) => {
  return tweet.parent ? (
    <Tweet
      hideActions
      hideLink
      isRetweet
      className={" "}
      retweeter={retweeter}
      tweet={tweet.parent}
      handleAction={handleAction}
    />
  ) : null;
};

// col-10 mx-auto col-md-6
const Tweet = (props) => {
  const {
    tweet,
    hideActions,
    updateTweet,
    hideLink,
    isRetweet,
    retweeter,
  } = props;
  const [actionTweet, setActionTweet] = useState(tweet ? tweet : null);
  let className =
    isRetweet === true
      ? `${props.className} p-2 border rounded`
      : props.className;

  const handleAction = async (tweet, action) => {
    const obj = { action: action, id: tweet.id };
    try {
      const response = await tweetAction(obj);
      // console.log(response);
      if (response.status === 200) {
        const { data } = response;
        setActionTweet(data);
      } else if (response.status === 201) {
        updateTweet(response.data);
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        toast.error("You must login to perform this action");
        props.history.push("/login");
        console.clear();
      }
    }
  };

  // my-5 py-4 border bg-white text-dark
  return (
    <div className={className}>
      {isRetweet === true && (
        <div className="mb-2">
          <span className="small text-muted">
            Retweet via <UserDisplay user={retweeter} />
          </span>
        </div>
      )}
      <div className="d-flex">
        <UserPicture user={tweet.user} />
        <div className="col-11">
          <div>
            <p>
              <UserDisplay user={tweet.user} includeFullName />
            </p>
            <p>{tweet.content}</p>
            <ParentTweet
              tweet={tweet}
              retweeter={tweet.user}
              handleAction={handleAction}
            />
          </div>
          <div className="btn btn-group px-0">
            {hideActions !== true && (
              <React.Fragment>
                <ActionBtn
                  tweet={actionTweet}
                  handleAction={handleAction}
                  action={{ type: "like", display: "Likes" }}
                  className="btn btn-primary"
                />
                <ActionBtn
                  tweet={actionTweet}
                  handleAction={handleAction}
                  action={{ type: "unlike", display: "Unlike" }}
                  className="btn btn-outline-primary"
                />
                <ActionBtn
                  tweet={actionTweet}
                  handleAction={handleAction}
                  action={{ type: "retweet", display: "Retweet" }}
                  className="btn btn-outline-success"
                />
              </React.Fragment>
            )}
            {hideLink === true ? (
              <Link
                to={`/tweets/${tweet.id}`}
                className="btn btn-outline-primary"
              >
                View
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tweet;

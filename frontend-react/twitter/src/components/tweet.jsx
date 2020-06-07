import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tweetAction } from "../services/tweetService";

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

const ParentTweet = ({ tweet, handleAction }) => {
  return tweet.parent ? (
    <div className="col-11 mx-auto p-3 border rounded">
      <p className="mb-0 text-muted small">Retweet</p>
      <Tweet
        hideActions
        hideLink
        tweet={tweet.parent}
        handleAction={handleAction}
      />
    </div>
  ) : null;
};

// col-10 mx-auto col-md-6
const Tweet = (props) => {
  const { tweet, hideActions, updateTweet, hideLink } = props;
  const [actionTweet, setActionTweet] = useState(tweet ? tweet : null);

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
      console.log("error in tweet ", ex);
    }
  };
  // my-5 py-4 border bg-white text-dark
  return (
    <div className="col-12 col-md-10 mx-auto border rounded my-5 py-4">
      <div>
        {hideLink === true ? (
          <Link
            to={`/tweet/detail/${tweet.id}`}
            style={{ textDecoration: "none" }}
          >
            <p>
              {tweet.id} - {tweet.content}
            </p>
          </Link>
        ) : (
          <p>
            {tweet.id} - {tweet.content}{" "}
          </p>
        )}

        <ParentTweet tweet={tweet} handleAction={handleAction} />
      </div>
      {hideActions !== true && (
        <div className="btn btn-group">
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
        </div>
      )}
    </div>
  );
};

export default Tweet;

import React from "react";

const ActionBtn = (props) => {
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
    <div className="row">
      <div className="col-11 mx-auto p-3 border rounded">
        <p className="mb-0 text-muted small">Retweet</p>
        <Tweet hideActions tweet={tweet.parent} handleAction={handleAction} />
      </div>
    </div>
  ) : null;
};

// col-10 mx-auto col-md-6
const Tweet = (props) => {
  const { tweet, handleAction, hideActions } = props;

  return (
    <div className="my-5 py-4 border bg-white text-dark">
      <div>
        <p>
          {tweet.id} - {tweet.content}
        </p>
        <ParentTweet tweet={tweet} handleAction={handleAction} />
      </div>
      {hideActions !== true && (
        <div className="btn btn-group">
          <ActionBtn
            tweet={tweet}
            handleAction={handleAction}
            action={{ type: "like", display: "Likes" }}
            className="btn btn-primary"
          />
          <ActionBtn
            tweet={tweet}
            handleAction={handleAction}
            action={{ type: "unlike", display: "Unlike" }}
            className="btn btn-outline-primary"
          />
          <ActionBtn
            tweet={tweet}
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

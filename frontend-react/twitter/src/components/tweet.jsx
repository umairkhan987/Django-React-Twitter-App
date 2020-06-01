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

// col-10 mx-auto col-md-6
const Tweet = (props) => {
  const { tweet, handleAction } = props;

  return (
    <div className="my-5 py-4 border bg-white text-dark">
      <p>
        {tweet.id} - {tweet.content}
      </p>
      <div className="btn btn-group">
        <ActionBtn
          tweet={tweet}
          handleAction={handleAction}
          action={{ type: "like", display: "Like" }}
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
    </div>
  );
};

export default Tweet;

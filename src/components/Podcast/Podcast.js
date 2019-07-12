import React from "react";
import classes from "./Podcast.css";
import { IoIosHeart, IoIosHeartEmpty } from "react-icons/io";

const podcast = props => {
  return (
    <li className={classes.Podcast} onClick={props.clicked}>
      <img src={props.image} />
      <div className={classes.Bold}>{props.podcastName}</div>
      <div className={classes.Sub}>{props.artistName}</div>
      <div className={classes.IconContainer}>
        {!props.checked ? (
          <IoIosHeartEmpty className={classes.Icon} />
        ) : (
          <IoIosHeart className={[classes.Icon, classes.Checked].join(" ")} />
        )}
      </div>
    </li>
  );
};

export default podcast;

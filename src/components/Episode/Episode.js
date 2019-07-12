import React, { Component } from "react";
import classes from "./Episode.css";
import Aux from "../../hoc/Auxi/Auxiliary";
import { FaPlusSquare } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
const episode = props => {
  const { episode } = props;
  return (
    <li className={classes.Item} onClick={props.played}>
      <div className={classes.Bold}>{props.title}</div>
      <div className={classes.Sub}>{props.pubDate}</div>
      <div className={classes.Sub}>{props.duration}</div>
      <div title={props.description}>
        <FontAwesomeIcon
          className={classes.Icon}
          icon={faInfoCircle}
          style={{ width: "21", height: "21", color: "rgb(0,0,0)" }}
          onMouseEnter={props.handleMouseHover}
          onMouseLeave={props.handleMouseHover}
        />
      </div>
      {props.disabled ? null : (
        <div>
          <FaPlusSquare
            className={classes.Icon}
            onClick={props.clicked}
            style={{ width: "18", height: "18", color: "rgb(0,0,0)" }}
          />
        </div>
      )}
    </li>
  );
};

export default episode;

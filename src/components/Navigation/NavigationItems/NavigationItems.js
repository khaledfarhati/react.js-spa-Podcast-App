import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { FaFirstAid } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const navigationitems = props => (
  <div className={props.menu}>
    <ul>
      <li className={classes.NavigationItem}>
        <FaFirstAid className={classes.Blue} />
        <NavigationItem link="/newepisodes">
          <span> New Episodes</span>
        </NavigationItem>
        <div className={classes.Count}>
          {props.countepisode
            ? Object.entries(props.countepisode).length >= 1
              ? Object.values(props.countepisode).reduce(reducer)
              : 0
            : 0}
        </div>
      </li>

      <li className={classes.NavigationItem}>
        <IoIosHeart className={classes.Pink} />
        <NavigationItem link="/favorites">
          <span>Favorites</span>
        </NavigationItem>
        <div className={classes.Count}>
          {props.count
            ? Object.entries(props.count).length >= 1
              ? Object.values(props.count).reduce(reducer)
              : 0
            : 0}
        </div>
      </li>
    </ul>
  </div>
);
export default navigationitems;

import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavigationItem.css";
const navigationitem = props => (
  <NavLink to={props.link} activeClassName={classes.active}>
  
    {props.children}
  </NavLink>
);
export default navigationitem;

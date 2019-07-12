import React, { Component } from "react";
import Sidebar from "../../components/Navigation/SideBar/SideBar";
import Player from "../../components/Player/Player";
import classes from "./Layout.css";
class Layout extends Component {
  render() {
    const Header = this.props.location.pathname.split("/")[1];
    const capitalizedHeader = Header.charAt(0).toUpperCase() + Header.slice(1);
    return (
      <main className={classes.Wrapper}>
        <Sidebar {...this.props} />

        <div className={classes.RightContent}>
          <div className={classes.Header}>
            <h1> {capitalizedHeader}</h1>
          </div>
          <div className={classes.Body}>{this.props.children}</div>
          <div className={classes.Footer}>
            <div>
              <source />
            </div>
            <Player playedepisode={this.props.playedepisode} />
          </div>
        </div>
      </main>
    );
  }
}
export default Layout;

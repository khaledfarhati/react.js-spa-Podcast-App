import React, { Component } from "react";
import { DragSource } from "react-dnd";
import classes from "./FavPodcast.css";

class FavPodcast extends Component {
  render() {
    const { isDragging, connectDragSource, podcast } = this.props;
    const opacity = isDragging ? 0.2 : 1;
    return connectDragSource(
      <li className={classes.Podcast} onClick={this.props.clicked}>
        <div className={classes.Header}>
          <img src={this.props.image} alt="" />
          <div className={classes.Title}>{this.props.name}</div>
          <div className={classes.Tail} />
        </div>
      </li>
    );
  }
}
const itemSource = {
  beginDrag(props) {
    console.log("dragging");
    return {
      podcast: {
        name: props.name
      }
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    return console.log("drag is over");
  }
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(itemSource),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}
//export default FavPodcast;
export default DragSource("podcast", itemSource, collect)(FavPodcast);

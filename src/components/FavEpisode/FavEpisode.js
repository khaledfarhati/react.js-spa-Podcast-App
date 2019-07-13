import React from "react";
import classes from "./FavEpisode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DragSource } from "react-dnd";
const FavEpisode = props => {
  const { isDragging, connectDragSource, episode, index } = props;
  let rmvIcon = null;

  if (props.hasOwnProperty("deletePlayListFavEpisodeHandler")) {
    rmvIcon = (
      <FontAwesomeIcon
        icon={faTrash}
        style={{ color: "rgb(0,0,0)", width: "16", height: "16" }}
        onClick={() => props.deletePlayListFavEpisodeHandler(index)}
      />
    );
  }
  if (props.hasOwnProperty("deleteFavEpisodeHandler")) {
    rmvIcon = (
      <FontAwesomeIcon
        icon={faTrash}
        style={{ color: "rgb(0,0,0)", width: "16", height: "16" }}
        onClick={() => props.deleteFavEpisodeHandler(index)}
      />
    );
  }
  return connectDragSource(
    <li className={classes.Item} index={index} onClick={props.played}>
      <img className={classes.Image} src={props.src} alt="" />
      <div className={classes.Bold}>{props.name}</div>
      <div className={classes.Sub}>{props.duration}</div>
      <div className={classes.Text}>{props.title}</div>
      <div className={classes.Description} title={props.title}>
        <FontAwesomeIcon
          className={classes.Icon}
          style={{ color: "rgb(0,0,0)", width: "24", height: "24" }}
          icon={faInfoCircle}
        />
      </div>

      {rmvIcon}
    </li>
  );
};

const itemSource = {
  beginDrag(props) {
    return {
      episode: {
        title: props.title,
        name: props.name,
        duration: props.duration,
        image: props.src,
        url: props.url,
        index: props.index
      }
    };
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
  }
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(itemSource),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource("episode", itemSource, collect)(FavEpisode);

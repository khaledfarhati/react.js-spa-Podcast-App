import React, { Component } from "react";
import Aux from "../../../hoc/Auxi/Auxiliary";
import { DropTarget } from "react-dnd";
import classes from "./PlayListItem.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
class playlistitem extends Component {
  getListItemContent = index =>
    index === this.props.editListItemId ? (
      <ContextMenuTrigger id={index}>
        <li
          onBlur={() => this.props.SetEditListItem("")}
          className={this.props.activeItem === index ? classes.Selected : ""}
        >
          <input
            type="text"
            name="name"
            onKeyPress={e => this.props.handleKeyPressed(e)}
            index={this.props.index}
            value={this.props.value}
            onChange={e =>
              this.handleItemsChange(e.target.value, this.props.id)
            }
          />
        </li>
      </ContextMenuTrigger>
    ) : (
      <ContextMenuTrigger id={index}>
        <li
          onDoubleClick={() => this.props.SetEditListItem(index)}
          onClick={() => this.props.handleOnclickItem(index)}
          className={this.props.activeItem === index ? classes.Selected : ""}
        >
          <a
            onClick={e =>
              this.props.clicked(this.props.value, this.props.index)
            }
          >
            {this.props.value}
          </a>
        </li>
      </ContextMenuTrigger>
    );

  handleItemsChange = (name, id) => {
    const items = this.props.items.map((item, idx) => {
      if (id !== idx) {
        return item;
      }
      return { ...item, name: name };
    });

    this.props.updateItems(items);
  };
  addpodcast(item, itemId, id) {
    this.props.pushPodcast(item, itemId, id);
  }
  render() {
    const {
      connectDropTarget,
      hovered,
      podcast,
      index,
      value,
      id
    } = this.props;

    return connectDropTarget(
      <div className={classes.ItemContainer}>
        <div>{this.getListItemContent(index)}</div>
        <ContextMenu
          id={index}
          style={{ Position: "fixed", opacity: "1", pointerEvents: "auto" }}
        >
          <MenuItem onClick={() => this.props.SetEditListItem(index)}>
            Rename
          </MenuItem>
          <MenuItem
            //className={classes.MenuItem}
            onClick={() => this.props.deleteItemHandler(id)}
          >
            Delete
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }
}
const PodcastItemList = {
  drop(props, monitor, component) {
    // You can disallow drop based on props or item
    const itemId = props.index;
    const item = monitor.getItem();
    component.addpodcast(item.episode.index, itemId, item);
    return {
      itemId: item
    };
  }
};
function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    episode: monitor.getItem()
  };
}

export default DropTarget("episode", PodcastItemList, collect)(playlistitem);

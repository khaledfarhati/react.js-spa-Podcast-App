import React, { Component } from "react";
import Search from "../../Search/Search";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideBar.css";
import Aux from "../../../hoc/Auxi/Auxiliary";
import { FaPlus } from "react-icons/fa";
import Playlistitem from "../PlayListItem/PlayListItem";

class SideBar extends Component {
  state = {
    items: [],
    editListItemId: "",
    activeItem: null
  };

  editListItem = id => {
    this.setState({ editListItemId: id });
  };
  deleteItemHandler = id => {
    const items = [...this.state.items];
    items.splice(id, 1);
    this.setState({ items });
  };

  handleKeyPressed = e => {
    if (e.key === "Enter") {
      this.editListItem("");
    }
  };
  handleAddItem = () => {
    this.setState({
      items: this.state.items.concat([{ name: this.newlist.value }])
    });
  };
  handleAddItemKeyPressed = e => {
    if (e.key === "Enter") {
      this.handleAddItem();
    }
  };

  updateItems = items => {
    this.setState({ items });
  };

  handleOnclickItem = id => {
    this.setState({ activeItem: id });
  };
  /*  onClick={() => this.selectedItemHandler(index)}
        className={this.isActive(index) ? "Selected" : ""} */
  render() {
    let playlistitems = null;
    if (this.state.items.length > 0) {
      playlistitems = this.state.items.map((item, i) => (
        <Playlistitem
          index={`item${i}`}
          key={item + i}
          id={i}
          value={item.name}
          updateItems={this.updateItems}
          items={this.state.items}
          pushPodcast={this.props.pushPodcast}
          clicked={this.props.SelectedItemList}
          editListItemId={this.state.editListItemId}
          SetEditListItem={this.editListItem}
          handleKeyPressed={this.handleKeyPressed}
          handleOnclickItem={this.handleOnclickItem}
          activeItem={this.state.activeItem}
          deleteItemHandler={this.deleteItemHandler}
        />
      ));
    }

    return (
      <aside className={classes.SideBar}>
        <Search {...this.props} search={classes.Search} />
        <NavigationItems
          menu={classes.Menu}
          count={this.props.count}
          countepisode={this.props.countepisode}
        />
        <div className={classes.PlaylistHeader}>
          <h3>Playlist</h3>
        </div>
        <div className={classes.Playlists}>
          <ul>{playlistitems}</ul>
        </div>

        <div className={classes.Footer}>
          <FaPlus onClick={this.handleAddItem} />
          <input
            type="text"
            placeholder="NewList"
            ref={input => (this.newlist = input)}
            onKeyPress={e => this.handleAddItemKeyPressed(e)}
          />
        </div>
      </aside>
    );
  }
}

export default SideBar;

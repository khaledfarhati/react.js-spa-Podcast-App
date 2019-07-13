import React, { Component } from "react";
import classes from "./NewEpisodes.css";
import FavEpisode from "../../components/FavEpisode/FavEpisode";
import axios from "axios";
import formatTime from "../../lib/formatTime";
import Spinner from "../../components/ui/Spinner/Spinner";

class NewEpisodes extends Component {
  state = {
    loadedselectedepisode: null
  };

  componentDidMount() {
    this.setState({ loadedselectedepisode: this.props.selectedepisodes });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedepisodes !== prevState.loadedselectedepisode) {
      return { loadedselectedepisode: nextProps.selectedepisodes };
    } else return;
  }
  render() {
    let episodes = null;
    if (
      this.props.selectedepisodes !== null &&
      !this.state.loadedselectedepisode === null
    ) {
      episodes = <Spinner />;
    }
    if (this.state.loadedselectedepisode) {
      episodes = Object.keys(this.state.loadedselectedepisode).map(
        (key, index) => (
          <FavEpisode
            key={`${key}${index}`}
            index={key}
            src={this.state.loadedselectedepisode[key].image}
            name={this.state.loadedselectedepisode[key].podcast}
            duration={this.state.loadedselectedepisode[key].duration}
            title={this.state.loadedselectedepisode[key].title}
            url={this.state.loadedselectedepisode[key].url}
            deleteFavEpisodeHandler={this.props.deleteFavEpisodeHandler}
            selectedPlayedEpisodeHandler={this.selectedPlayedEpisodeHandler}
            played={() =>
              this.props.selectedPlayedEpisodeHandler(
                this.state.loadedselectedepisode[key].title,
                this.state.loadedselectedepisode[key].duration,
                this.state.loadedselectedepisode[key].url,
                this.state.loadedselectedepisode[key].image,
                this.state.loadedselectedepisode[key].duration
              )
            }
          />
        )
      );
    }

    return <ul>{episodes}</ul>;
  }
}

export default NewEpisodes;

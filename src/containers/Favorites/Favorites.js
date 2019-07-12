import React, { Component } from "react";
import Aux from "../../hoc/Auxi/Auxiliary";
import classes from "./Favorites.css";
import FullPodcast from "../FullPodcast/FullPodcast";
import { Route } from "react-router-dom";
import FavPodcast from "../../components/FavPodcast/FavPodcast";
import axios from "../../axios-itunes";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/ui/Spinner/Spinner";
class Favorites extends Component {
  state = {
    loadedPodcast: null,
    clicked: false,
    error: false
  };

  async fetchPodcast() {
    if (this.props.id) {
      const promises = Object.keys(this.props.id).map(async podcast => {
        if (
          !this.state.loadedPodcast ||
          (this.state.loadedPodcast &&
            this.state.loadedPodcast.results[0].trackeId !==
              this.props.id[podcast])
        ) {
          const response = await axios
            .get(`?id=${this.props.id[podcast]}&entity=podcast`)
            .then(response => {
              return response;
            })
            .catch(error => {
              this.setState({ error: true });
            });

          if (response === undefined) return;
          else
            return {
              artworkUrl100: response.data.results[0].artworkUrl100,
              trackId: response.data.results[0].trackId,
              trackName: response.data.results[0].trackName,
              feedUrl: response.data.results[0].feedUrl
            };
        }
      });
      const results = await Promise.all(promises);
      this.setState({ loadedPodcast: results });
    }
  }
  componentDidMount() {
    this.mounted = true;
    if (this.mounted) {
      this.fetchPodcast();
    }
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  selectedPodcastIdHandler = (id, name, image, feedurl) => {
    this.props.history.push({
      pathname: `/favorites/${id}`,
      name: name,
      image: image,
      feedurl: feedurl
    });

    this.setState({ clicked: true });
  };
  render() {
    let favorites = this.state.error ? (
      <p style={{ textAlign: "center" }}>Podcast wont loaded</p>
    ) : null;
    if (this.props.id) {
      if (
        Object.entries(this.props.id).length >= 1 &&
        !this.state.error &&
        this.state.loadedPodcast === null
      ) {
        favorites = <Spinner />;
      }
    }

    if (!this.state.error && !this.state.clicked && this.state.loadedPodcast) {
      favorites = (
        <ul className={classes.Grid}>
          {this.state.loadedPodcast.map((podcast, i) => (
            <li
              key={podcast.trackeId}
              className={classes.Podcast}
              onClick={() =>
                this.selectedPodcastIdHandler(
                  podcast.trackId,
                  podcast.trackName,
                  podcast.artworkUrl100,
                  podcast.feedUrl
                )
              }
            >
              <div className={classes.Header}>
                <img src={podcast.artworkUrl100} alt="" />
                <div className={classes.Title}>{podcast.trackName}</div>
                <div className={classes.Tail} />
              </div>
            </li>
          ))}
        </ul>
      );
    }
    if (this.state.clicked) {
      favorites = (
        <Route
          path={this.props.match.url + "/:id"}
          exact
          render={props => (
            <FullPodcast
              selectedEpisodesesHandler={this.props.selectedEpisodesesHandler}
              selectedPlayedEpisodeHandler={
                this.props.selectedPlayedEpisodeHandler
              }
              {...props}
              disabled={this.props.disabled}
            />
          )}
        />
      );
    }

    return <div className={classes.List}>{favorites}</div>;
  }
}
export default Favorites;

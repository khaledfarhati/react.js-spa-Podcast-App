import React, { Component } from "react";
import classes from "./FindPodcast.css";
import Podcast from "../../components/Podcast/Podcast";
import Aux from "../../hoc/Auxi/Auxiliary";
class FindPodcast extends Component {
  state = {
    podcasts: {}
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.state.podcasts !== prevState.podcasts) {
      return { podcasts: nextProps.location.state.podcasts };
    } else return null;
  }
  componentDidMount() {
    this.setState({ podcasts: this.props.location.state.podcasts });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.location.state.podcasts !== this.props.location.state.podcasts
    ) {
      this.setState({ podcasts: this.props.location.state.podcasts });
    }
  }
  render() {
    let podcast = null;
    if (this.props.location.state.podcasts) {
      podcast = <p style={{ textAlign: "center" }}>loading...!</p>;
    }
    if (this.state.podcasts) {
      podcast = (
        <div className={classes.List}>
          <ul>
            {this.state.podcasts.map((podcast, i) => (
              <Podcast
                key={i}
                image={podcast.artworkUrl60}
                podcastName={podcast.trackName}
                artistName={podcast.artistName}
                clicked={() =>
                  this.props.podcastSelectedHandler(i, podcast.trackId)
                }
                checked={this.props.checked[i + podcast.trackId]}
              />
            ))}
          </ul>
        </div>
      );
    }
    return <Aux>{podcast}</Aux>;
  }
}
export default FindPodcast;

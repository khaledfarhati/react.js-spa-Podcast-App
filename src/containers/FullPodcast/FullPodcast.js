import React, { Component } from "react";
import Episode from "../../components/Episode/Episode";
import Spinner from "../../components/ui/Spinner/Spinner";
import axios from "../../axios-itunes";
import axiosParseUrl from "../../axios-ParserUrl";
import Aux from "../../hoc/Auxi/Auxiliary";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import classes from "./FullPodcast.css";
import formatTime from "../../utils/formatTime";

const initialState = null;
class FullPodcast extends Component {
  state = {
    loadedepisodes: null,
    fullepisodes: null,
    test: null,
    count: 0,
    error: false,
    isHovring: false
  };

  fetchedRssEpisode() {
    const episodeArray = [];
    if (this.props.match.params.id) {
      axios
        .get(`?id=${this.props.match.params.id}&entity=podcast`)
        .then(response => {
          if (response.data.results[0].hasOwnProperty("feedUrl")) {
            axiosParseUrl
              .get(`/api.json?rss_url=${response.data.results[0].feedUrl}`)
              .then(response => {
                this.setState({ loadedepisodes: response.data.items });
              })
              .catch(error => {
                this.setState({ error: true });
              });
          }
        })
        .catch(err => {
          this.setState({ error: true });
        });
    }
  }

  componentDidMount() {
    this.fetchedRssEpisode();
  }
  handleMouseHover = () => {
    this.setState(prevState => ({ isHovring: !prevState.isHovring }));
  };

  render() {
    let episode = this.state.error ? <h1>Full episodes wont loaded</h1> : null;

    if (this.props.match.params) {
      if (
        Object.entries(this.props.match.params).length >= 1 &&
        !this.state.error &&
        this.state.loadedepisodes === null
      ) {
        episode = <Spinner />;
      }
    }
    if (this.state.loadedepisodes !== null) {
      episode = (
        <ul className={classes.List}>
          <div className={classes.Settings}>
            <img src={this.props.location.image} alt="" />
            <div className={classes.Header}>{this.props.location.name}</div>
            <div className={classes.Count}>
              {this.state.loadedepisodes.length}
            </div>

            <div className={classes.Unsubscribe}>icon</div>
          </div>

          {this.state.loadedepisodes.map((episode, i) => {
            return (
              <Episode
                key={i}
                title={episode.title}
                type={episode.enclosure.type}
                url={episode.enclosure.link}
                duration={formatTime(episode.enclosure.duration)}
                pubDate={episode.pubDate}
                description={episode.description}
                isHovring={this.state.isHovring}
                handleMouseHover={this.handleMouseHover}
                clicked={e =>
                  this.props.selectedEpisodesesHandler(
                    e,
                    i + this.props.match.params.id,
                    this.props.match.params.id,
                    episode.title,
                    this.props.location.name,
                    this.props.location.image,
                    episode.enclosure.link,
                    formatTime(episode.enclosure.duration)
                  )
                }
                played={() =>
                  this.props.selectedPlayedEpisodeHandler(
                    episode.title,
                    episode.enclosure.length,
                    episode.enclosure.link,
                    this.props.location.image,
                    formatTime(episode.enclosure.duration)
                  )
                }
                disabled={this.props.disabled[i + this.props.match.params.id]}
              />
            );
          })}
        </ul>
      );
    }
    return <div>{episode}</div>;
  }
}
export default WithErrorHandler(FullPodcast, axios);

import React, { Component } from "react";
import FavEpisode from "../../components/FavEpisode/FavEpisode";
import Spinner from "../../components/ui/Spinner/Spinner";
var playList = null;
class PlayList extends Component {
  state = {
    playList: null
  };
  componentDidMount() {
    if (this.props.listitems) {
      playList = Object.keys(this.props.listitems)
        .filter(key => key.includes(this.props.match.params.name))
        .map(key => this.props.listitems[key]);
      this.setState({ playList });
      console.log(this.state.playList);
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.listitems) {
      playList = Object.keys(nextProps.listitems)
        .filter(key => key.includes(nextProps.match.params.name))
        .map(key => nextProps.listitems[key]);
      if (playList !== prevState.playList) {
        return { playList: playList };
      }
    } else return;
  }
  render() {
    const item = this.props.match.params.name;
    let episode = null;
    if (
      this.props.location.state !== undefined &&
      this.props.location.state.length !== 0
    ) {
      episode = <Spinner />;
    }
    if (this.state.playList) {
      episode = this.state.playList
        .map(episodes => Object.values(episodes)[0])
        .map((episode, i) => (
          <div>
            {console.log(episode.index)}
            <FavEpisode
              key={i}
              index={`${item}${episode.index}`}
              name={episode.name}
              src={episode.image}
              duration={episode.duration}
              title={episode.title}
              deletePlayListFavEpisodeHandler={
                this.props.deletePlayListFavEpisodeHandler
              }
            />
          </div>
        ));
    }
    return (
      <div>
        <ul>{episode}</ul>
      </div>
    );
  }
}

export default PlayList;

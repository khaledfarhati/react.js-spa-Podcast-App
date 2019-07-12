import React, { Component } from "react";
import Layout from "../src/hoc/Layout/Layout";
import Favorites from "./containers/Favorites/Favorites";
import FindPodcast from "./containers/FindPodcast/FindPodcast";
import { Route, withRouter } from "react-router-dom";
import axios from "axios";
import NewEpisodes from "./containers/NewEpisodes/NewEpisodes";
import PlayList from "./containers/PlayList/PlayList";
import Spinner from "./components/ui/Spinner/Spinner";
import WithErrorHandler from "./hoc/WithErrorHandler/WithErrorHandler";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
const API_URL = "https://itunes.apple.com/search";
let i = 0;
const initialState = {};
class App extends Component {
  state = {
    query: null,
    podcasts: {},
    selectedPodcastId: null,
    selectedepisodes: null,
    fullepisodes: null,
    playedepisode: null,
    count: null,
    countepisode: null,
    listitems: null,
    loading: false
  };

  getInfo = () => {
    axios
      .get(`${API_URL}?term=${this.state.query}&entity=podcast&limit=7`)
      .then(response =>
        this.setState({ podcasts: response.data.results, loading: false })
      );
  };
  reset = () => {
    this.setState({ playedepisode: initialState });
  };
  handleInputChange = value => {
    this.props.history.push("/");
    this.setState({
      query: value,
      loading: true
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query && this.state.query.length > 1) {
      if (
        !this.state.podcasts ||
        (this.state.podcasts && prevState.query !== this.state.query)
      ) {
        this.getInfo();
      }
    }
  }

  keyOutHandler = () => {
    this.setState({ loading: false });
  };

  pressedEnterHandler = e => {
    var code = e.keyCode || e.which;
    if (code === 13 && Object.entries(this.state.podcasts).length >= 1) {
      this.props.history.push({
        pathname: "/findPodcasts/",
        state: {
          podcasts: this.state.podcasts
        }
      });
    } else {
      this.setState({ loading: true });
    }
    this.keyOutHandler();
  };
  fullEpisodeHandler = fullepisodes => {
    this.setState({ fullepisodes });
  };
  podcastSelectedHandler = (index, id) => {
    const selectedPodcastId = { ...this.state.selectedPodcastId };
    let count = { ...this.state.count };
    selectedPodcastId[index + id] =
      selectedPodcastId[index + id] === id ? null : id;
    count[index + id] = 1 || 0;
    if (selectedPodcastId[index + id] === null) {
      delete selectedPodcastId[index + id];
      delete count[index + id];
    }
    this.setState({
      selectedPodcastId,
      count
    });
  };

  selectedEpisodesesHandler = (
    e,
    index,
    id,
    title,
    podcast,
    image,
    url,
    duration
  ) => {
    e.stopPropagation();
    const selectedepisodes = { ...this.state.selectedepisodes };
    let countepisode = { ...this.state.countepisode };
    selectedepisodes[index] =
      {
        id: id,
        title: title,
        podcast: podcast,
        image: image,
        url: url,
        duration: duration
      } || " ";
    countepisode[index] = 1 || 0;
    this.setState({ selectedepisodes, countepisode });
  };
  deleteFavEpisodeHandler = id => {
    const selectedepisodes = { ...this.state.selectedepisodes };
    const countepisode = { ...this.state.countepisode };
    delete selectedepisodes[id];
    delete countepisode[id];
    this.setState({ selectedepisodes, countepisode });
  };
  selectedPlayedEpisodeHandler = (name, time, url, image, duration) => {
    this.setState({
      playedepisode: {
        name: name,
        time: time,
        url: url,
        image: image,
        duration: duration
      }
    });
  };
  pushPodcast = (id, item, episode) => {
    const listitem = { ...this.state.listitems };
    listitem[item + id] = episode;
    this.setState({ listitems: listitem });
  };
  SelectedItemList = (item, name) => {
    if (this.state.listitems) {
      return this.props.history.push({
        pathname: `/${item}/${name}`
      });
    } else return;
  };
  deletePlayListFavEpisodeHandler = id => {
    const listitems = { ...this.state.listitems };
    delete listitems[id];

    this.setState({ listitems });
  };

  render() {
    const disabledInfo = { ...this.state.selectedepisodes };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] !== null;
    }
    const checkedInfo = { ...this.state.selectedPodcastId };
    for (let key in checkedInfo) {
      checkedInfo[key] = checkedInfo[key] !== null;
    }

    let findPodcasts = null;
    if (this.state.podcasts) {
      findPodcasts = (
        <Route
          exact
          path="/findPodcasts"
          render={props => (
            <FindPodcast
              podcastSelectedHandler={this.podcastSelectedHandler}
              checked={checkedInfo}
              {...props}
            />
          )}
        />
      );
    }
    if (this.state.loading) {
      findPodcasts = <Spinner />;
    }
    return (
      <Layout
        handleInputChange={this.handleInputChange}
        pressedEnterHandler={this.pressedEnterHandler}
        keyOutHandler={this.keyOutHandler}
        playedepisode={this.state.playedepisode}
        {...this.props}
        count={this.state.count}
        countepisode={this.state.countepisode}
        value={this.state.query}
        pushPodcast={this.pushPodcast}
        SelectedItemList={this.SelectedItemList}
      >
        <Route
          path="/favorites"
          render={props => (
            <Favorites
              id={this.state.selectedPodcastId}
              selectedEpisodesesHandler={this.selectedEpisodesesHandler}
              selectedPlayedEpisodeHandler={this.selectedPlayedEpisodeHandler}
              {...props}
              disabled={disabledInfo}
            />
          )}
        />
        {findPodcasts}
        <Route
          path="/newepisodes"
          render={props => (
            <NewEpisodes
              selectedepisodes={this.state.selectedepisodes}
              fullEpisodeHandler={this.fullEpisodeHandler}
              deleteFavEpisodeHandler={this.deleteFavEpisodeHandler}
              {...props}
            />
          )}
        />
        <Route
          path={"/:item" + "/:name"}
          render={props => (
            <PlayList
              {...props}
              deletePlayListFavEpisodeHandler={
                this.deletePlayListFavEpisodeHandler
              }
              listitems={this.state.listitems}
            />
          )}
        />
      </Layout>
    );
  }
}

export default withRouter(DragDropContext(HTML5Backend)(App));

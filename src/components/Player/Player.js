import React, { PureComponent } from "react";
import classes from "./Player.css";
import VolumeBars from "./VolumeBars/VolumeBars";
import Aux from "../../hoc/Auxi/Auxiliary";
import formatTime from "../../lib/formatTime";

import {
  FaPodcast,
  FaBackward,
  FaPlay,
  FaPause,
  FaForward
} from "react-icons/fa";
class Player extends PureComponent {
  constructor(props) {
    super(props);
    let lastPlayed = 0;
    let lastVolumePref = 1;
    let lastPlayBackRate = 1;

    this.state = {
      skipForward: 30,
      skipBackward: -30,
      progressTime: 0,
      playing: true,
      duration: 0,
      currentTime: lastPlayed,
      currentVolume: lastVolumePref,
      showTooltip: false,
      playBackRate: lastPlayBackRate,
      timeWasLoaded: lastPlayed !== 0,
      tooltipPosition: 0,
      tooltipTime: "0:00"
    };
  }

  componentDidMount() {
    this.hydrateStateWithLocalstorage();
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );
  }
  componentWillUnmount() {
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    );

    // saves if component has a chance to unmount
    this.saveStateToLocalStorage();
  }
  timeUpdate = e => {
    console.log(e.currentTarget);
    const { currentTime = 0, duration = 0 } = e.currentTarget;
    const progressTime = (currentTime / duration) * 100;
    if (Number.isNaN(progressTime)) return;
    this.setState({ progressTime, currentTime, duration });
  };
  skipFarward = () => {
    this.audio.currentTime += this.state.skipForward;
    console.log(this.state.currentTime);
  };

  togglePlay = () => {
    console.log("cliked");
    const { playing } = this.state;
    const method = playing ? "play" : "pause";
    this.audio[method]();
    console.log(this.state.playing);
    console.log(this.audio.paused);
    console.log(this.audio.currentTime);
  };

  playPause = () => {
    console.log("playing");
    this.setState({ playing: this.audio.paused });
  };
  speed = change => {
    const playBackRateMin = 0.75;
    const playBackRateMax = 2.5;
    let playBackRate = this.state.playBackRate + change;
    if (playBackRate > playBackRateMax) {
      playBackRate = playBackRateMin;
    }
    if (playBackRate < playBackRateMin) {
      playBackRate = playBackRateMax;
    }
    this.setState({ playBackRate });
  };
  speedUp = () => {
    this.speed(0.25);
    console.log(this.state.playBackRate);
  };
  speedDown = e => {
    e.preventDefault();
    this.speed(-0.25);
  };
  volume = e => {
    this.audio.volume = e.currentTarget.value;
    console.log(e.currentTarget.value);
    console.log(this.audio.volume);
    this.setState({
      currentVolume: `${e.currentTarget.value}`
    });
  };
  scrubTime = eventData =>
    (eventData.nativeEvent.offsetX / this.progress.offsetWidth) *
    this.audio.duration;
  scrub = e => {
    this.audio.currentTime = this.scrubTime(e);
  };
  seekTime = e => {
    this.setState({
      tooltipPosition: e.nativeEvent.offsetX,
      tooltipTime: formatTime(this.scrubTime(e))
    });
  };

  componentDidUpdate(prevProps, prevState) {
    this.audio.playbackRate = prevState.playBackRate;
  }
  hydrateStateWithLocalstorage() {
    if (this.props.playedepisode) {
      const lastState = Object.assign(
        {},
        {
          [`lastPlayed ${this.props.playedepisode.name}`]: this.state
            .currentTime,
          lastVolumeSettingsPref: this.state.currentVolume,
          lastPlayBackSetting: this.state.playBackRate
        }
      );

      for (let key in lastState) {
        if (localStorage.hasOwnProperty(key)) {
          let value = localStorage.getItem(key);
          try {
            value = JSON.parse(value);
            lastState[key] = value;
          } catch (e) {
            lastState[key] = value;
          }
        }
      }
      console.log(lastState["lastPlayBackSetting"]);

      this.setState({
        playBackRate: lastState["lastPlayBackSetting"]["lastPlayBackRate"],
        currentVolume: lastState["lastVolumeSettingsPref"]["lastVolumePref"],
        currentTime:
          lastState[`lastPlayed ${this.props.playedepisode.name}`]["lastPlayed"]
      });
    }
  }
  saveStateToLocalStorage() {
    if (this.props.playedepisode) {
      localStorage.setItem(
        `lastPlayed${this.props.playedepisode.name}`,
        JSON.stringify({ lastPlayed: this.state.currentTime })
      );
      localStorage.setItem(
        "lastVolumeSettingsPref",
        JSON.stringify({ lastVolumePref: this.state.currentVolume })
      );
      localStorage.setItem(
        "lastPlayBackSetting",
        JSON.stringify({ lastPlayBackRate: this.state.playBackRate })
      );
    }
  }
  render() {
    const {
      progressTime,
      playing,
      currentTime,
      currentVolume,
      showTooltip,
      playBackRate,
      timeWasLoaded,
      tooltipPosition,
      tooltipTime
    } = this.state;
    return (
      <div className={classes.Player}>
        <div>
          <div
            className={classes.ProgressBar}
            onClick={this.scrub}
            onMouseMove={this.seekTime}
            onMouseEnter={() => {
              this.setState({ showTooltip: true });
            }}
            onMouseLeave={() => {
              this.setState({ showTooltip: false });
            }}
            ref={x => (this.progress = x)}
          >
            <div
              className={classes.Progress}
              style={{ width: `${progressTime}%` }}
            >
              {/* eslint-enable */}
            </div>
          </div>
          <div
            className={classes.ToolTip}
            style={{
              left: `${tooltipPosition}px`,
              opacity: `${showTooltip ? "1" : "0"}`
            }}
          >
            {tooltipTime}
          </div>
        </div>

        {!this.props.playedepisode ? (
          <FaPodcast className={classes.Image} />
        ) : (
          <img
            src={this.props.playedepisode.image}
            alt=""
            className={classes.Image}
          />
        )}

        <div className={classes.Title}>
          {this.props.playedepisode
            ? this.props.playedepisode.name
            : "No episode selected"}
        </div>

        <FaBackward
          className={classes.Backward}
          onClick={this.skip}
          data-skip="-30"
        />

        <button className={classes.PausePlay} onClick={this.togglePlay}>
          <p>{playing ? <FaPlay /> : <FaPause />}</p>
        </button>

        <FaForward className={classes.Forward} onClick={this.skipFarward} />
        <div className={classes.Speed}>
          <button
            onClick={this.speedUp}
            onContextMenu={this.speedDown}
            className={classes.Speed}
            type="button"
          >
            <span className={classes.SpeedDisplay}>{playBackRate} &times;</span>
          </button>
        </div>
        <div className={classes.SpeedTitle}>FASTNESS</div>
        <div className={classes.VolumeTitle}>LOUDNESS</div>
        <div className={classes.Inputes}>
          <VolumeBars volume={this.volume} />
        </div>

        <div className={classes.Time}>{formatTime(currentTime)}</div>
        <div className={classes.Duration}>
          {this.props.playedepisode
            ? this.props.playedepisode.duration
            : "0.00"}
        </div>

        <audio
          ref={audio => (this.audio = audio)}
          onPlay={this.playPause}
          onPause={this.playPause}
          onTimeUpdate={this.timeUpdate}
          src={this.props.playedepisode ? this.props.playedepisode.url : null}
        />
      </div>
    );
  }
}
export default Player;

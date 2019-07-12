import React, { Component, Fragment } from "react";
import classes from "./VolumeBars.css";

const getItems = count => {
  return Array.from({ length: count }, (v, i) => (i + 1) * 10).map(k => {
    let deci = k / 100;
    return {
      integer: `${k}`,
      deci: `${deci}`,
      vol: `vol${k}`,
      level: `Volume Level ${k}/100`,
      checked: true
    };
  }); // END MAP
}; // END ARROW

class VolumeBars extends Component {
  state = {
    volumeBarList: getItems(10)
  };

  handleOnclick = index => {
    const volumeBarList = [...this.state.volumeBarList];
    for (let i = 0; i <= index; i++) {
      volumeBarList[i].checked = true;
    }
    for (let i = index + 1; i < 10; i++) {
      volumeBarList[i].checked = null;
    }

    this.setState({ volumeBarList });
  };
  render() {
    return (
      <div>
        {this.state.volumeBarList.map((item, index) => (
          <Fragment key={item.integer}>
            <input
              onClick={() => {
                this.handleOnclick(index);
              }}
              onChange={this.props.volume}
              type="radio"
              name="volume"
              value={item.deci}
              id={item.vol}
              className={classes.Sr}
            />
            <label
              htmlFor={item.vol}
              style={
                item.checked
                  ? { background: "#448aff" }
                  : { background: "#cccccc" }
              }
              className={classes.Label}
            >
              <span className={classes.Sr}>{item.level}</span>
            </label>
          </Fragment>
        ))}
      </div>
    );
  }
}
export default VolumeBars;

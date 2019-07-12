import React, { Component } from "react";
import classes from "./Search.css";
import { FaSistrix } from "react-icons/fa";
import { debounce } from "lodash";
import * as Rx from "rxjs";
import { debounceTime } from "rxjs/operators";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
class Search extends Component {
  constructor() {
    super();

    this.onSearch$ = new Rx.Subject();
  }
  componentDidMount() {
    this.subscription = this.onSearch$
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(debounced => this.props.handleInputChange(debounced));
  }
  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  handlechange = e => {
    this.onSearch$.next(this.search.value);
  };

  render() {
    return (
      <div className={this.props.search}>
        <FaSistrix />
        <input
          placeholder="Find Podcast"
          ref={input => (this.search = input)}
          onKeyUp={this.handlechange}
          onBlur={() => this.props.keyOutHandler()}
          onKeyPress={e => this.props.pressedEnterHandler(e)}
        />
      </div>
    );
  }
}

export default Search;

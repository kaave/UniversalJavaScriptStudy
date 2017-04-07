import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';

import * as NumberAction from '../actions/number';
import Head from '../components/head.jsx';

export default class extends Component {
  constructor (props) {
    super(props);

    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickDone = this.handleClickDone.bind(this);
    this.handleClickFail = this.handleClickFail.bind(this);
    this.handleClickIncrement = this.handleClickIncrement.bind(this);
    this.handleClickDecrement = this.handleClickDecrement.bind(this);
    this.handleClickSlowIncrement = this.handleClickSlowIncrement.bind(this);
    this.handleClickSlowDecrement = this.handleClickSlowDecrement.bind(this);
    this.handleClickFetch = this.handleClickFetch.bind(this);
  }

  static fetchData () {
    return NumberAction.creators.loadDone();
  }

  handleClickStart () {
    this.props.dispatch(NumberAction.creators.loadStart());
  }

  handleClickDone () {
    this.props.dispatch(NumberAction.creators.loadDone());
  }

  handleClickFail () {
    this.props.dispatch(NumberAction.creators.loadFail());
  }

  handleClickIncrement () {
    this.props.dispatch(NumberAction.creators.increment());
  }

  handleClickDecrement () {
    this.props.dispatch(NumberAction.creators.decrement());
  }

  handleClickSlowIncrement () {
    this.props.dispatch(NumberAction.creators.slowIncrement());
  }

  handleClickSlowDecrement () {
    this.props.dispatch(NumberAction.creators.slowDecrement());
  }

  handleClickFetch () {
    this.props.dispatch(NumberAction.creators.fetch());
  }

  render () {
    const { handleClickStart, handleClickDone, handleClickFail, handleClickIncrement, handleClickDecrement, handleClickSlowIncrement, handleClickSlowDecrement, handleClickFetch } = this;
    return (
      <div>
        <Head />
        <h2>Welcome to my App</h2>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/number">Number</Link></li>
        </ul>

        <ul>
          <li><button onClick={handleClickStart}>START</button></li>
          <li><button onClick={handleClickDone}>DONE</button></li>
          <li><button onClick={handleClickFail}>FAIL</button></li>
          <li><button onClick={handleClickIncrement}>Increment</button></li>
          <li><button onClick={handleClickDecrement}>Decrement</button></li>
          <li><button onClick={handleClickSlowIncrement}>SlowIncrement</button></li>
          <li><button onClick={handleClickSlowDecrement}>SlowDecrement</button></li>
          <li><button onClick={handleClickFetch}>Fetch</button></li>
        </ul>

        {
          this.props.children && cloneElement(this.props.children, {
            numbers: this.props.numberNumbers
          })
        }
      </div>
    );
  }
}


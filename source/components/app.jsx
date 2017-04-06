import React, { Component, cloneElement } from 'react';
import { Link } from 'react-router';

import * as NumberAction from '../actions/number';
import Head from './head.jsx';

export default class extends Component {
  constructor (props) {
    super(props);

    this.handleClickStart = this.handleClickStart.bind(this);
    this.handleClickDone = this.handleClickDone.bind(this);
    this.handleClickFail = this.handleClickFail.bind(this);
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

  render () {
    const { handleClickStart, handleClickDone, handleClickFail } = this;
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


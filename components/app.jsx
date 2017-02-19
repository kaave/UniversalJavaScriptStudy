import React from 'react';
import { Link } from 'react-router';

import Head from './head.jsx';

export default function(props) {
  return (
    <div>
      <Head />
      <h2>Welcome to my App</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
      </ul>

      {props.children}
    </div>
  );
}


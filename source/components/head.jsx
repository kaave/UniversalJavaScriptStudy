import React from 'react';
import Helmet from 'react-helmet';

const link = process.env.NODE_ENV === 'production' ? [{ rel: 'stylesheet', href: 'app.css' }] : [];

export default function(_props) {
  return (
    <Helmet
      htmlAttributes={{ lang: 'ja' }}
      title="Universal React Redux"
      titleTemplate="Universal React Redux - %s"
      defaultTitle="My Default Title"
      titleAttributes={{ itemprop: 'name', lang: 'ja' }}
      meta={[
        { name: 'description', content: 'Universal JavaScript: powered by React with Redux' },
        { name: 'charset', content: 'UTF-8' }
      ]}
      link={link}
    />
  );
}

export const helmet = Helmet;

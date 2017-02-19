import React from 'react';
import Helmet from "react-helmet";

export default function (props) {
  return (
    <Helmet
      htmlAttributes={{ lang: "ja" }} // amp takes no value
      title="Universal React Redux"
      titleTemplate="Universal React Redux - %s"
      defaultTitle="My Default Title"
      titleAttributes={{ itemprop: "name", lang: "ja" }}
      meta={[
        { name: "description", content: "Universal JavaScript: powered by React with Redux" },
        { name: "charset", content: "UTF-8" }
      ]}
    />
  );
}

export const helmet = Helmet;

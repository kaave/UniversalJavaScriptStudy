import React from 'react';

export default function (props) {
  const { numbers } = props;

  return (
    <div>
      <h3>Numbers</h3>
      {(numbers || []).map((num, i) => <p key={i}>{num}</p>)}
    </div>
  );
}


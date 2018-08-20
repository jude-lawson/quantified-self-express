import React from 'react';

const SectionHeader = (props) => {
  if (props.sub) {
    return (
      <h4>
        <a href=''>{props.name}</a>
      </h4>
    );
  } else {
    return (
      <h3>
        <a href=''>{props.name}</a>
      </h3>
    );
  }
}

export default SectionHeader;

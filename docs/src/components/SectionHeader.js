import React from 'react';

const SectionHeader = (props) => {
  if (props.sub) {
    return (
      <h4 className='sub-section-header'>
        <a href=''>{props.name}</a>
      </h4>
    );
  } else {
    return (
      <h3 className='section-header'>
        <a href=''>{props.name}</a>
      </h3>
    );
  }
}

export default SectionHeader;

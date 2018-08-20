import React, { Component } from 'react';

import SectionLink from './SectionLink';

export default class SectionsDrawer extends Component {
  render() {
    return (
      <aside className='sections-drawer'>
        <h3>Endpoints</h3>
        <h4>Foods</h4>
        <ul>
          <SectionLink name='Get All Foods' />
          <SectionLink name='Get A Single Food' />
          <SectionLink name='Create A Food' />
          <SectionLink name='Edit A Food' />
          <SectionLink name='Delete A Food' />
        </ul>
      </aside>
    );
  }
}

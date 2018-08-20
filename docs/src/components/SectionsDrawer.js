import React, { Component } from 'react';

import SectionLink from './SectionLink';
import SectionHeader from './SectionHeader';

export default class SectionsDrawer extends Component {
  render() {
    return (
      <aside className='sections-drawer'>
        <SectionHeader name='Introduction' />
        <SectionHeader name='Setup' />
        <SectionHeader name='Endpoints' />
        <SectionHeader name='Foods' sub={true} />
        <ul>
          <SectionLink name='Get all foods' />
          <SectionLink name='Get a single food' />
          <SectionLink name='Add a food' />
          <SectionLink name='Update a food' />
          <SectionLink name='Remove a food' />
        </ul>
        <h4>Meals</h4>
        <ul>
          <SectionLink name='Get all meals' />
          <SectionLink name='Get a meal and its foods' />
          <SectionLink name='Add a food to a meal' />
          <SectionLink name='Remove a food from a meal' />
        </ul>
        <h3>Contributing</h3>
      </aside>
    );
  }
}

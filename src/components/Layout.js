import React from 'react';
import {
  Grid
}  from 'semantic-ui-react'

import HeaderColumn from './Header';
import SearchBox from './Search';


export default props => (
  <Grid celled='internally' padded='horizontally' >
  <Grid.Row>
    <HeaderColumn/>
  </Grid.Row>
  <Grid.Row>
    <Grid.Column width={16}>
    <SearchBox/>
    </Grid.Column>
  </Grid.Row>
  {props.children}
  </Grid>

);

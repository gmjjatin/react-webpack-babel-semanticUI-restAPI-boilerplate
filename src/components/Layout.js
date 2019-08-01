import React from 'react';
import {
  Grid
}  from 'semantic-ui-react'

import HeaderColumn from './Header';



export default props => (
  <Grid celled='internally' padded='horizontally' >
  <Grid.Row>
    <HeaderColumn/>
  </Grid.Row>
  {props.children}
  </Grid>

);

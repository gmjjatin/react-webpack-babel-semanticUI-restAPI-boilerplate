import React from 'react';
import {
  Grid
}  from 'semantic-ui-react'

import HeaderColumn from './Header';



export default props => (
  <Grid celled stackable padded='vertically' >
  <Grid.Row>
    <HeaderColumn/>
  </Grid.Row>
  {props.children}
  </Grid>

);

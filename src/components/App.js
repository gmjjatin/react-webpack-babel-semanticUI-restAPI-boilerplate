import React,{Component} from 'react';
import {
  Grid,Segment,Pagination,Icon, Label, Menu, Table
}  from 'semantic-ui-react'

import HeaderColumn from './Header';
import SearchBox from './Search';
import apis from './api'

export default class  extends Component {
    state = {
      shipments:[]
    }
    componentWillMount(){
      apis.loadShipments().then(resp=>{
        this.setState({
          shipments:resp.data
        })
      })

    }
    render(){
      return(

        <Grid celled='internally' padded='horizontally' >
        <Grid.Row>
        <HeaderColumn/>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column width={16}>
        <SearchBox/>
        </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={2}>
        <Grid.Column >
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Shipment Id</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Mode</Table.HeaderCell>
              <Table.HeaderCell>User</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
          {this.state.shipments.map(shipment=>{
            return(
              <Table.Row key={shipment.id}>
                <Table.Cell>{shipment.id}</Table.Cell>
                <Table.Cell>{shipment.name.split('from')[0]}<br/></Table.Cell>
                <Table.Cell>{shipment.status}</Table.Cell>
                <Table.Cell>{shipment.mode}</Table.Cell>
                <Table.Cell>{shipment.userId}</Table.Cell>
              </Table.Row>

            )
        })}


          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='6'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item as='a'>1</Menu.Item>
                  <Menu.Item as='a'>2</Menu.Item>
                  <Menu.Item as='a'>3</Menu.Item>
                  <Menu.Item as='a'>4</Menu.Item>
                  <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </Grid.Column>

        </Grid.Row>
        </Grid>


      );
    }
  }

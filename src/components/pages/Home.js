import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,Segment,Pagination,Icon, Label, Menu, Table,Header
}  from 'semantic-ui-react'

import apis from '../../api'
import SearchBox from '../Search';

export default class Home extends Component {
    state = {
      shipments:[],
      pageIndex:0,
      chunkSize:20
    }
    shiftPagePrev=()=>{
      if(this.state.pageIndex>0){
        this.setState((prevState)=>{
            return {pageIndex:--prevState.pageIndex}
        })
      }
    }
    shiftPageNext=()=>{
      const max=this.state.shipments.length-1
      if(this.state.pageIndex<max){
        this.setState((prevState)=>{
            return {pageIndex:++prevState.pageIndex}
        })
    }

    }
    componentWillMount(){
      apis.loadShipments().then(resp=>{
        const {shipments,chunkSize} =this.state
        for (var i=0,j=resp.data.length; i<j; i+=chunkSize) {
            shipments.push(resp.data.slice(i,i+chunkSize));
        }

        this.setState({
          shipments:shipments
        })
        console.log("line_item",this.state)
      })

    }
    render(){
      const { pageIndex }=this.state
      console.log(pageIndex)
      return(
        <Grid.Row centered columns={3}>
        <Grid.Column width={3}>
          <SearchBox/>
        </Grid.Column>
        <Grid.Column width={10}>
        <Segment>
            <Header textAlign='center' size='large'>All Shipments</Header>
        </Segment>
        <Table celled striped stackable={true}>
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
          {
            this.state.shipments.map((pages,index)=>{
            if(index === pageIndex){
              return(
                pages.map((shipment,index)=>{
                    return(

                <Table.Row key={shipment.id}>
                <Table.Cell>
                <Link to={{
                  pathname: '/ShipmentDetail',
                  shipment_id: shipment.id,
                }}>{shipment.id}</Link>
                </Table.Cell>
                <Table.Cell>{shipment.name}<br/></Table.Cell>
                <Table.Cell>{shipment.status}</Table.Cell>
                <Table.Cell>{shipment.mode}</Table.Cell>
                <Table.Cell>{shipment.userId}</Table.Cell>
                </Table.Row>


              )
            })
                )
              }
            })
          }
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan='6'>
                <Menu floated='right' pagination>
                  <Menu.Item as='a' icon onClick={this.shiftPagePrev}>
                    <Icon name='chevron left' />
                  </Menu.Item>
                  <Menu.Item as='a' icon onClick={this.shiftPageNext}>
                    <Icon name='chevron right' />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        </Grid.Column>

        </Grid.Row>

      );
    }
  }

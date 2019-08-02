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
      chunkSize:20,
      ascSort:true
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

    filterRows=(id)=>{
      this.props.history.push('/ShipmentDetail/'+id)
    }

    handleSort=(sortKey)=>{
      const { shipments,ascSort } = this.state;
      let temp=[]
      if(ascSort){
        shipments.map(page=>{
          temp.push(page.sort((a,b) => a[sortKey].localeCompare(b[sortKey])))
        })
        this.setState({shipment:temp,ascSort:!ascSort})
      }
      else{
        shipments.map(page=>{
          temp.push(page.sort((a,b) => b[sortKey].localeCompare(a[sortKey])))
        })
        this.setState({shipment:temp,ascSort:!ascSort})
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

      })

    }
    render(){
      const { pageIndex }=this.state
      return(
        <Grid.Row centered columns={3}>
        <Grid.Column width={3}>
          <SearchBox onChange={this.filterRows}/>
        </Grid.Column>
        <Grid.Column width={10}>
        <Segment>
            <Header textAlign='center' size='large'>All Shipments</Header>
        </Segment>
        <Table celled striped stackable={true}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell onClick={e=>this.handleSort('id')}>Shipment Id  <Icon name='sort'/></Table.HeaderCell>
              <Table.HeaderCell onClick={e=>this.handleSort('name')}>Name  <Icon name='sort'/></Table.HeaderCell>
              <Table.HeaderCell onClick={e=>this.handleSort('status')}>Status  <Icon name='sort'/></Table.HeaderCell>
              <Table.HeaderCell onClick={e=>this.handleSort('mode')}>Mode  <Icon name='sort'/></Table.HeaderCell>
              <Table.HeaderCell onClick={e=>this.handleSort('userId')}>User  <Icon name='sort'/></Table.HeaderCell>
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

import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Grid,Segment,Button,Icon,Header,List,Form,Message
}  from 'semantic-ui-react'

import apis from '../../api'

export default class ShipmentDetail extends Component {
    state = {
      shipment:null,
      isNameEditOn:false,
      name:'',
      noIdPassed:false,
      noResponse:false,

    }

    toggleEditName = () => {  this.setState({isNameEditOn:!this.state.isNameEditOn}) }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const {shipment,name} = this.state
        shipment.name=name;
        apis.editShipment(shipment).then(resp=>{
          this.setState({shipment})
        })
        this.toggleEditName()

    }

    componentWillMount(){

      let id = this.props.match.params.id || this.props.location.shipment_id


      if(id){
        apis.readShipment(id)
        .then(resp=>{


        this.setState({
          shipment:resp.data,
          name:resp.data.name
        })

      })
        .catch(error =>{
          this.setState({noResponse:error})
        })
      }
      else{
        this.setState({noIdPassed:true})
      }

    }
    render(){
      const { shipment,name,noIdPassed,noResponse,isNameEditOn } = this.state
      return(
        <Grid.Row centered columns={3}>
          <Grid.Column mobile={16} tablet={2} computer={2}>
            <Link to='/' >
              <Button floated='right' content='Back' icon='left arrow' basic  labelPosition='left' />
            </Link>
          </Grid.Column >
          <Grid.Column mobile={16} tablet={10} computer={10}>
            <Segment>
                <Header textAlign='center' size='large' >Shipment Detail</Header>

            </Segment>
            <Segment placeholder>
            {noIdPassed &&
              <Grid.Column width={16}>
              <Message
                 error
                 header='No shipment id passed'
                 list={[
                   'Either a click a shipment id from previous page',
                   'Or pass it in url like - /ShipmentDetail/S1000',
                 ]}
                />
              </Grid.Column >
            }
            {noResponse &&
              <Grid.Column width={16}>
              <Message
                 error
                 header='No response from Server'
                 list={[
                   'Received no response from API server for this shipment id',
                   'Reason - '+noResponse,
                 ]}
                />
              </Grid.Column >
            }
            {
              !noIdPassed && !noResponse &&
              <Grid stackable columns={3}>
              <Grid.Column mobile={16} tablet={16} computer={16}>
              {!isNameEditOn && shipment &&
                <Header>
                <Icon name='pencil' onClick={this.toggleEditName}/>
                <Header.Content>
                Name : {shipment.name}
                </Header.Content>
                </Header>
              }
              {isNameEditOn && shipment &&
                <Form onSubmit={this.handleSubmit}>
                <Form.Group widths={2}>
                <Icon name='close' size='big' onClick={this.toggleEditName}/>
                <Form.Input placeholder='Enter New Name' name='name' value={name} onChange={this.handleChange} />
                <Form.Button primary content='Submit' />
                </Form.Group>
                </Form>
              }
              </Grid.Column >

              <Grid.Column mobile={16} tablet={5} computer={4}>
              { shipment &&
                <List>
                <List.Item >
                <Icon name='right triangle' />
                <List.Content>
                <List.Header>Mode</List.Header>
                <List.Description>
                {shipment.mode}
                </List.Description>
                </List.Content>
                </List.Item>
                <List.Item>
                <Icon name='right triangle' />
                <List.Content>
                <List.Header>type</List.Header>
                <List.Description>
                {shipment.type}
                </List.Description>
                </List.Content>
                </List.Item>
                <List.Item>
                <Icon name='right triangle' />
                <List.Content>
                <List.Header>Origin</List.Header>
                <List.Description>
                {shipment.origin}
                </List.Description>
                </List.Content>
                </List.Item>
                <List.Item>
                <Icon name='right triangle' />
                <List.Content>
                <List.Header>Destination</List.Header>
                <List.Description>
                {shipment.destination}
                </List.Description>
                </List.Content>
                </List.Item>
                <List.Item>
                <Icon name='right triangle' />
                <List.Content>
                <List.Header>Status</List.Header>
                <List.Description>
                {shipment.status}
                </List.Description>
                </List.Content>
                </List.Item>
                <List.Item>
                <Icon name='right triangle' />
                <List.Content>
                <List.Header>UserId</List.Header>
                <List.Description>
                {shipment.userId}
                </List.Description>
                </List.Content>
                </List.Item>
                </List>

              }
              </Grid.Column >
              <Grid.Column mobile={16} tablet={3} computer={3}>
              {shipment && <Header as='h5'>Services</Header>}
              {shipment && shipment.services.map((service,index)=>{
                return(
                  <p key={index}>
                  {service.type}
                  </p>
                )

              })}
              </Grid.Column >
              <Grid.Column mobile={16} tablet={8} computer={6}>
              {shipment && <Header as='h5'> Cargo</Header>}
              {shipment && shipment.cargo.map((cargo,index)=>{
                return(
                  <Segment key={index}>
                  <List key={index}>
                  <List.Item key={index+1}>
                  <Icon name='right triangle' />
                  <List.Content>
                  <List.Header>Type</List.Header>
                  <List.Description>
                  {cargo.type}
                  </List.Description>
                  </List.Content>
                  </List.Item>
                  <List.Item key={index+2}>
                  <Icon name='right triangle' />
                  <List.Content>
                  <List.Header>Volume</List.Header>
                  <List.Description>
                  {cargo.volume}
                  </List.Description>
                  </List.Content>
                  </List.Item>
                  <List.Item key={index+3}>
                  <Icon name='right triangle' />
                  <List.Content>
                  <List.Header>Description</List.Header>
                  <List.Description>
                  {cargo.description}
                  </List.Description>
                  </List.Content>
                  </List.Item>

                  </List>
                  </Segment>

                )

              })}
              </Grid.Column >


              </Grid>
            }
            </Segment>

          </Grid.Column>
        </Grid.Row>

      );
    }
  }

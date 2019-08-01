import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Grid,Segment,Button,Icon,Header,List,Form
}  from 'semantic-ui-react'

import apis from '../../api'

export default class ShipmentDetail extends Component {
    state = {
      shipment:null,
      isNameEditOn:false,
      name:''
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
      apis.readShipment(this.props.location.shipment_id).then(resp=>{
        console.log("line_item",resp)

        this.setState({
          shipment:resp.data,
          name:resp.data.name
        })
        console.log("line_item",this.state)
      })

    }
    render(){

      return(
        <Grid.Row centered columns={3}>
          <Grid.Column width={2}>
            <Link to='/' >
              <Button floated='right' content='Back' icon='left arrow' basic  labelPosition='left' />
            </Link>
          </Grid.Column >
          <Grid.Column width={10}>
            <Segment>
                <Header textAlign='center' size='large' >Shipment Detail</Header>

            </Segment>
            <Segment placeholder>
              <Grid columns={3}>
                <Grid.Column width={16}>
                {!this.state.isNameEditOn && this.state.shipment &&
                  <Header>
                    <Icon name='pencil' onClick={this.toggleEditName}/>
                    <Header.Content>
                      Name : {this.state.shipment.name}
                    </Header.Content>
                  </Header>
                }
                {this.state.isNameEditOn && this.state.shipment &&
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths={2}>
                    <Icon name='close' size='big' onClick={this.toggleEditName}/>
                      <Form.Input placeholder='Enter New Name' name='name' value={this.state.shipment.name} onChange={this.handleChange} />
                      <Form.Button primary content='Submit' />
                    </Form.Group>
                  </Form>
                }
                </Grid.Column >

                <Grid.Column width={4}>
                  { this.state.shipment &&
                      <List>
                      <List.Item >
                      <Icon name='right triangle' />
                      <List.Content>
                      <List.Header>Mode</List.Header>
                      <List.Description>
                      {this.state.shipment.mode}
                      </List.Description>
                      </List.Content>
                      </List.Item>
                      <List.Item>
                      <Icon name='right triangle' />
                      <List.Content>
                      <List.Header>type</List.Header>
                      <List.Description>
                      {this.state.shipment.type}
                      </List.Description>
                      </List.Content>
                      </List.Item>
                      <List.Item>
                      <Icon name='right triangle' />
                      <List.Content>
                      <List.Header>Origin</List.Header>
                      <List.Description>
                      {this.state.shipment.origin}
                      </List.Description>
                      </List.Content>
                      </List.Item>
                      <List.Item>
                      <Icon name='right triangle' />
                      <List.Content>
                      <List.Header>Destination</List.Header>
                      <List.Description>
                      {this.state.shipment.destination}
                      </List.Description>
                      </List.Content>
                      </List.Item>
                      <List.Item>
                      <Icon name='right triangle' />
                      <List.Content>
                      <List.Header>Status</List.Header>
                      <List.Description>
                      {this.state.shipment.status}
                      </List.Description>
                      </List.Content>
                      </List.Item>
                      <List.Item>
                      <Icon name='right triangle' />
                      <List.Content>
                      <List.Header>UserId</List.Header>
                      <List.Description>
                      {this.state.shipment.userId}
                      </List.Description>
                      </List.Content>
                      </List.Item>
                      </List>

                  }
                </Grid.Column >
                <Grid.Column width={2}>
                  <Header as='h5'>Services</Header>
                  {this.state.shipment && this.state.shipment.services.map((service,index)=>{
                      return(
                        <p key={index}>
                        {service.type}
                        </p>
                      )

                    })}
                </Grid.Column >
                <Grid.Column width={6}>
                <Header as='h5'> Cargo</Header>
                {this.state.shipment && this.state.shipment.cargo.map((cargo,index)=>{
                    return(
                      <Segment>
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
            </Segment>

          </Grid.Column>
        </Grid.Row>

      );
    }
  }

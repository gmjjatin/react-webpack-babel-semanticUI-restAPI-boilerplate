import React from 'react';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/components/App';

import apis from '../src/api'
import db from '../db.json'
//snapshot test
describe('App component', () => {
  test('snapshot renders', () => {
    const component = renderer.create(
      <BrowserRouter>
      <App/>
      </BrowserRouter>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// api test
describe('APIs Endpoint test', () => {
  it('should load all shipments', () => {
      apis.loadShipments()
      .then(resp=>{
        expect(resp.data).toEqual(db.shipments);
      })
      .catch(error=>console.log(error))

    });

  const index=Math.floor(Math.random() * Math.floor(db.shipments.length));
  it('should load a specific shipment', () => {
      apis.readShipment(db.shipments[index].id)
      .then(resp=>{
        expect(resp.data).toEqual(db.shipments[index]);
      })
      .catch(error=>console.log(error))

    });

  it('should update name of a specific shipment', () => {
      db.shipments[index].name='new name'
      apis.editShipment(db.shipments[index])
      .then(()=>{
        apis.readShipment(db.shipments[index].id)
        .then(resp=>{
          expect(resp.data).toEqual(db.shipments[index]);
        })
        .catch(error=>console.log(error))
      })
      .catch(error=>console.log(error))

    });
});

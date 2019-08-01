import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/"
});

const apis = {
  readShipment: id => api.get("shipments/" + id),
  loadShipments: () => api.get("shipments"),
  removeShipments: id => api.delete("shipments/" + id),
  createShipment: category => api.post("shipments", shipment),
  editShipment: category => api.put("shipments/" + shipment.id, shipment),

};

export default apis;

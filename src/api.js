import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337/"
});

const apis = {
  readShipment: id => api.get("shipments/" + id),
  loadShipments: () => api.get("shipments"),
  removeShipments: id => api.delete("shipments/" + id),
  createShipment: shipment => api.post("shipments", shipment),
  editShipment: shipment => api.put("shipments/" + shipment.id, shipment),

};

export default apis;

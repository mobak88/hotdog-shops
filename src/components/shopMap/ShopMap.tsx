import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

type ShopMapType = {
  coords: LatLngExpression;
  about: string | undefined;
};

const ShopMap = ({ coords, about }: ShopMapType) => {
  return (
    <MapContainer center={coords} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coords}>
        <Popup>{about}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default ShopMap;

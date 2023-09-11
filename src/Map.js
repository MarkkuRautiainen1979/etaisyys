import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import AddMarkers from "./AddMarkers";
import { useLocation } from './LocationComponent';

const Map = (props) => {

  const { latitude, longitude } = useLocation();
  console.log(latitude);
  console.log(longitude);
  
  return latitude !== null && longitude !== null ? (
        <MapContainer
      doubleClickZoom={false}
      id="mapId"
      zoom={16}
      center={{
        lat: latitude,
        lng: longitude,
      }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles &copy; Esri &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri"
      />
      <AddMarkers />
    </MapContainer>
  ) : null ;
};

export default Map;
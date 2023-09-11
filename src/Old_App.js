import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

function DistanceCalculator() {
  const [markers, setMarkers] = useState([]);
  const [distance, setDistance] = useState(0);

  const calculateDistance = () => {
    if (markers.length === 2) {
      const latlng1 = markers[0].latlng;
      const latlng2 = markers[1].latlng;

      const distanceInMeters = latlng1.distanceTo(latlng2);
      setDistance(distanceInMeters.toFixed(2));
    }
  };

  const handleMapClick = (event) => {
    const newMarker = {
      latlng: event.latlng,
    };

    if (markers.length < 2) {
      setMarkers([...markers, newMarker]);
    } else {
      setMarkers([newMarker]);
      setDistance(0);
    }
  };

  return (
    <div>
      <h1>Distance Calculator</h1>
      <MapContainer center={[62.604900, 29.759400]} zoom={10} style={{ height: "800px" }} onClick={handleMapClick}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.latlng}>
            <Popup>Marker {index + 1}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {markers.length === 2 && (
        <div>
          <button onClick={calculateDistance}>Calculate Distance</button>
          <p>Distance between markers: {distance} meters</p>
        </div>
      )}
    </div>
  );
}

export default DistanceCalculator;
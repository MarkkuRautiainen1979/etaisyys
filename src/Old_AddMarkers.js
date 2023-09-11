import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from 'leaflet';

const AddMarkers = () => {
  const [markers, setMarkers] = useState([
    {
      lat: 62.604900,
      lng: 29.759400
    }
  ]);

  const customIcon = new L.Icon({
    iconUrl: './owl.png', // URL to the custom marker icon
    iconSize: [50, 50], // Size of the icon
    iconAnchor: [16, 32], // Anchor point of the icon (middle bottom)
    popupAnchor: [0, -32], // Anchor point for the popup (top of the icon)
  });

  const map = useMapEvents({
    click: (e) => {
      setMarkers([...markers, e.latlng]);
    }
  });
  return (
    <>
      {markers.map((marker, i) => (
        <Marker key={`marker-${i}`} position={marker} icon={customIcon}>
          <Popup>
            <span>
              Yleinen ikoni<br />
            </span>
          </Popup>
        </Marker>
      ))}
      {/* <Marker position={markers[0]}>
        <Popup>
          <span>
            A pretty CSS3 popup. <br /> Easily customizable.
          </span>
        </Popup>
      </Marker> */}
    </>
  );
};

export default AddMarkers;
import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from 'leaflet';

const AddMarkers = () => {
  const [markers, setMarkers] = useState([]);
  const [locationName, setLocationName] = useState(null);

  const iconMap = {
    owl: new L.Icon({
      iconUrl: './owl.png',
      iconSize: [50, 50],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    vwbeetle: new L.Icon({
      iconUrl: './vwbeetle.png',
      iconSize: [50, 50],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    diamond: new L.Icon({
      iconUrl: './diamond.png',
      iconSize: [80, 80],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    }),
    // Add more icon types and their corresponding icons
  };

  const map = useMapEvents({
    click: (e) => {
      const currentMarkers = [...markers];
      currentMarkers.push({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        iconType: currentMarkers.length % 3 === 0 ? "owl" : currentMarkers.length % 3 === 1 ? "vwbeetle" : "diamond"
      });
      setMarkers(currentMarkers);
    }
  });

  const calculateDistance = (index1, index2) => {
    if (index1 < 0 || index2 < 0 || index1 >= markers.length || index2 >= markers.length) {
      return "Invalid markers";
    }

    const latlng1 = L.latLng(markers[index1].lat, markers[index1].lng);
    const latlng2 = L.latLng(markers[index2].lat, markers[index2].lng);
    const distanceInMeters = latlng1.distanceTo(latlng2);
    return distanceInMeters.toFixed(2) + " metriä";
  };

  return (
    <>
      {markers.map((marker, i) => (
        <Marker key={`marker-${i}`} position={{ lat: marker.lat, lng: marker.lng }} icon={iconMap[marker.iconType]}>
          <Popup>
            <span>
              {marker.iconType === "owl" ? `merkki ${i+1}` : marker.iconType === "vwbeetle" ? `merkki ${i+1}` : `merkki ${i+1}`}<br />
              Leveys koordinaatit : {marker.lat.toFixed(6)} , <br />
              Pituus koordinaatit : {marker.lng.toFixed(6)} <br />
              Etäisyys seuraavan pisteeseen : {i < markers.length - 1 ? calculateDistance(i, i + 1) : "Ei saatavilla"}
            </span>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default AddMarkers;
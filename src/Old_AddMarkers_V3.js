import React, { useState, useEffect } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from 'leaflet';

const AddMarkers = () => {
  const [markers, setMarkers] = useState([]);

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

  useMapEvents({
    click: (e) => {
      const latlng = e.latlng;

      // Käynnistä haku asynkronisessa funktiossa
      fetchLocationName(latlng, (locationName) => {
        const currentMarkers = [...markers];
        currentMarkers.push({
          lat: latlng.lat,
          lng: latlng.lng,
          iconType: currentMarkers.length % 3 === 0 ? "owl" : currentMarkers.length % 3 === 1 ? "vwbeetle" : "diamond",
          locationName: locationName
        });
        setMarkers(currentMarkers);
      });
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

  const fetchLocationName = async (latlng, callback) => {
    try {
      const response = await fetch('lopputulos.json');
      if (!response.ok) {
        throw new Error('JSON-tiedoston lataus epäonnistui');
      }

      const lopputulosData = await response.json();

      // Etsi lähin sijainti ja aseta nimi
      const matchedLocation = lopputulosData.find(location => {
        const lat = latlng.lat;
        const lon = latlng.lng;
        return lat >= location.south && lat <= location.north && lon >= location.west && lon <= location.east;
      });

      if (matchedLocation) {
        callback(matchedLocation.nimi);
        console.log(matchedLocation.nimi);
      } else {
        callback(null);
      }
    } catch (error) {
      console.error('Virhe JSON-tiedoston latauksessa:', error);
    }
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
              Lähellä oleva sijainti: {marker.locationName ? marker.locationName : "Ei saatavilla"} <br />
              Etäisyys seuraavan pisteeseen : {i < markers.length - 1 ? calculateDistance(i, i + 1) : "Ei saatavilla"}
            </span>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default AddMarkers;
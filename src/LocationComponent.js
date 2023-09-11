import React, { useState, useEffect } from 'react';

function useLocation() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      console.error('Paikallistus ei toimi.');
    }
  }, []);

  return { latitude, longitude };
}

export default function LocationComponent() {
  const { latitude, longitude } = useLocation();

  return (
    <div>
      <h2>Sinun koordinaattisi ovat:</h2>
      {latitude !== null && longitude !== null ? (
        <p>
          Latitude: {latitude.toFixed(6)} astetta leveyttä, Longitude: {longitude.toFixed(6)} astetta pituutta
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

// Export the useLocation function for external use
export { useLocation };

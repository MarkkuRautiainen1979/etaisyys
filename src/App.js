import React from "react";
import LocationComponent from "./LocationComponent";
import Map from './Map'
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <LocationComponent/>
      <Map />
    </div>
  );
}

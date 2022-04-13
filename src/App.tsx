import React, { useEffect, useState } from "react";
import "./App.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./components/map/Map";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface MapOptions {
  zoom: number;
  center: google.maps.LatLngLiteral;
}

function App() {
  const [options, setOptions] = useState<MapOptions>({
    zoom: 3,
    center: {
      lat: 0,
      lng: 0,
    },
  });

  return (
    <>
      <div className="App">
        <Wrapper apiKey={""} render={render}>
          <Map className="map-container" {...options} />
        </Wrapper>
      </div>
    </>
  );
}

export default App;

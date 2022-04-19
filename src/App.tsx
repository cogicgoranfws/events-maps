import React, { useEffect, useState } from "react";
import "./App.css";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Map from "./components/map/Map";
import { EventDataInterface } from "./data/events";
import { useEventsContext } from "./context/eventsContext";
import FilteredDisplay from "./components/filtered-display/FilteredDisplay";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

interface MapOptions {
  zoom: number;
  center: google.maps.LatLngLiteral;
}

export interface MyBounds {
  N: number;
  S: number;
  W: number;
  E: number;
}

function App() {
  const { events, setEvents } = useEventsContext();
  const [filteredEvents, setFilteredEvents] = useState<EventDataInterface[]>(
    []
  );
  const [options, setOptions] = useState<MapOptions>({
    zoom: 3,
    center: {
      lat: 0,
      lng: 0,
    },
  });

  useEffect(() => {
    console.log("FILTERED:", filteredEvents);
  }, [filteredEvents]);

  function onBoundsChanged(coords: MyBounds) {
    setFilteredEvents(
      events.filter(({ position }: EventDataInterface) => {
        console.log(coords, position);
        
        return (
          coords.N > position.lat &&
          coords.S < position.lat &&
          coords.W < position.lng &&
          coords.E > position.lng
        );
      })
    );
  }

  return (
    <>
      <div className="App">
        <FilteredDisplay events={filteredEvents} />
        <Wrapper apiKey={""} render={render}>
          <Map
            className="map-container"
            {...options}
            onBoundsChanged={onBoundsChanged}
          />
        </Wrapper>
      </div>
    </>
  );
}

export default App;

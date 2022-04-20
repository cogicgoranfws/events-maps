import React, { useEffect, useState } from "react";
import "./styles/main.scss";
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
  const { events, map } = useEventsContext();
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

  function sortByClosestToCenter(a: EventDataInterface, b: EventDataInterface) {
    const { lat, lng } = map!.getCenter();
    const aDiff = ((a.position.lat - lat())**2 + (a.position.lng - lng())**2)**(1/2);
    const bDiff = ((b.position.lat - lat())**2 + (b.position.lng - lng())**2)**(1/2);
    return aDiff - bDiff;
  }

  function onBoundsChanged(coords: MyBounds) {
    setFilteredEvents(
      events.filter(({ position }: EventDataInterface) => {
        return (
          coords.N > position.lat &&
          coords.S < position.lat &&
          coords.W < position.lng &&
          coords.E > position.lng
        );
      }).sort(sortByClosestToCenter)
    );
  }

  function mapGoToEvent(title: string) {
    const event = filteredEvents.find(
      (event: EventDataInterface) => event.title === title
    );
    if (!event) return;
    if (!map) throw new Error("Google maps not found!");
    map.panTo(event.position);
    setTimeout(() => {
      map.setZoom(8);
    }, 500);
  }

  return (
    <>
      <div className="App">
        <FilteredDisplay events={filteredEvents} onEventClick={mapGoToEvent} />
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

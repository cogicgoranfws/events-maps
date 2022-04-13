import React, { useEffect, useState } from "react";
import { useEventsContext } from "../../context/eventsContext";
import { EventDataInterface, eventsData } from "../../data/events";
import Marker from "./Marker";

interface MapProps extends google.maps.MapOptions {
  className: string;
  children?: typeof React.Children;
}

function Map({ className, ...options }: MapProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  const { events, setEvents } =
    useEventsContext();

  React.useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          zoom: options.zoom,
          center: options.center,
        })
      );
    }
  }, [ref, map]);

  useEffect(() => {
    if (events.length === 0) {
      setEvents(eventsData);
    }
  }, []);

  return (
    <>
      <div ref={ref} className={className}>
        {map && events.length
          ? events.map((event: EventDataInterface) => {
              return (
                <Marker
                  key={event.title}
                  position={event.position}
                  event={event}
                  map={map}
                />
              );
            })
          : null}
      </div>
      ;
    </>
  );
}

export default Map;

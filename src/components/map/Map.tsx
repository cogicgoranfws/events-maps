import React, { useEffect, useState } from "react";
import { MyBounds } from "../../App";
import { useEventsContext } from "../../context/eventsContext";
import { EventDataInterface, eventsData } from "../../data/events";
import { logBounds } from "../../utils/all";
import Marker from "./Marker";

interface MapProps extends google.maps.MapOptions {
  className: string;
  children?: typeof React.Children;
  onBoundsChanged: (bounds: MyBounds) => void;
}

function Map({ className, onBoundsChanged , ...options  }: MapProps): JSX.Element {
  const ref = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<google.maps.Map>();
  const { events, setEvents } = useEventsContext();
  const [boundsTimeout, setBoundsTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    return () => {
      if (boundsTimeout) clearTimeout(boundsTimeout);
    };
  }, []);

  function handleBoundsEvent() {
    if (boundsTimeout) clearTimeout(boundsTimeout);
    const timeout = setTimeout(() => {
      console.log("set");
      const bounds = map!.getBounds();

      const northBound = bounds!.getNorthEast().lat();
      const eastBound = bounds!.getNorthEast().lng();
      const southBound = bounds!.getSouthWest().lat();
      const westBounds = bounds!.getSouthWest().lng();

      logBounds(northBound, westBounds, eastBound, southBound);

      const formattedBounds: MyBounds = {
        N: northBound,
        S: southBound,
        W: westBounds,
        E: eastBound,
      };

      onBoundsChanged(formattedBounds);
    }, 750);

    setBoundsTimeout((prevTimeout: NodeJS.Timeout | null) => {
      if (prevTimeout) clearTimeout(prevTimeout);
      return timeout;
    });
  }

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

  useEffect(() => {
    if (map) {
      const listener = google.maps.event.addListener(
        map,
        "bounds_changed",
        () => {
          handleBoundsEvent();
        }
      );

      return () => {
        google.maps.event.removeListener(listener);
      };
    }
  }, [map]);

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

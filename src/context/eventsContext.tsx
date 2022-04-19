import { createContext, useContext, useEffect, useState } from "react";
import type { EventDataInterface } from "../data/events";

interface EventsContextInterface {
  events: EventDataInterface[];
  setEvents: React.Dispatch<React.SetStateAction<EventDataInterface[]>>;
  activeInfoWindow: google.maps.InfoWindow | null;
  setActiveInfoWindow: React.Dispatch<React.SetStateAction<google.maps.InfoWindow | null>>
}

const EventsContext = createContext<EventsContextInterface>({
  events: [],
  setEvents: () => {},
  activeInfoWindow: null,
  setActiveInfoWindow: () => {},
});

export default function EventsContextProvider({ children }: any) {
  const [events, setEvents] = useState<EventDataInterface[]>([]);
  const [activeInfoWindow, setActiveInfoWindow] =
    useState<google.maps.InfoWindow | null>(null);
  

  const value: EventsContextInterface = {
    events,
    setEvents,
    activeInfoWindow,
    setActiveInfoWindow,
  };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}

export function useEventsContext() {
  const context = useContext(EventsContext);
  if (context === undefined)
    throw new Error("Cannot use hook poutside of context");
  return context;
}

import { createContext, useContext, useEffect, useState } from "react";
import type { EventDataInterface } from "../data/events";

interface EventsContextInterface {
  events: EventDataInterface[];
  setEvents: React.Dispatch<React.SetStateAction<EventDataInterface[]>>;
  activeInfoWindow:google.maps.InfoWindow | null;
  setNewInfoWindow: (newInfoWindow: google.maps.InfoWindow) => void;
}

const EventsContext = createContext<EventsContextInterface>({
  events: [],
  setEvents: () => {},
  activeInfoWindow: null,
  setNewInfoWindow:() => {}
});

export default function EventsContextProvider({ children }: any) {
  const [events, setEvents] = useState<EventDataInterface[]>([]);
  const [activeInfoWindow, setActiveInfoWindow] = useState<google.maps.InfoWindow | null>(
    null
  );

  const value: EventsContextInterface = {
    events,
    setEvents,
    activeInfoWindow,
    setNewInfoWindow
  };

  function setNewInfoWindow(newInfoWindow: google.maps.InfoWindow) {
    setActiveInfoWindow((prevInfoWindow) => {
        if(prevInfoWindow) prevInfoWindow.close();
        return newInfoWindow;
    });
  }

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

export interface EventItemInterface {
  title: string;
  date: string;
  img: string;
  authors: string[];
  description: string;
  cap: number;
  booked: number;
  left: number;
}

export interface EventDataInterface extends EventItemInterface {
  position: google.maps.LatLngLiteral;
}

export const eventsData: EventDataInterface[] = [
  {
    title: "EXIT",
    date: "2022-07-07T19:00:00",
    img: "exit.png",
    description: "Exit festival",
    cap: 20000,
    booked: 500,
    left: 19500,
    authors: ["Artist 1", "Artis 2", "Artist 3", "Artist 4", "Artis 5", "Artist 6"],
    position: { lat: 45.25256827910394, lng: 19.863515807841722 }
  },
  {
    title: "Oktoberfest",
    date: "2022-09-17T00:00:00",
    img: "oktoberfest.jpg",
    description: "Oktobah",
    cap: 1000,
    booked: 500,
    left: 500,
    authors: ["Artist 1", "Artis 2", "Artist 3"],
    position: { lat: 48.13148352052675, lng: 11.548983716683983 } 
  },
  {
    title: "Guca",
    date: "2021-08-13T00:00:00",
    img: "guca.jpg",
    description: "Guca",
    cap: 1000,
    booked: 1000,
    left: 0,
    authors: ["Artist 1", "Artis 2", "Artist 3"],
    position: { lat: 43.77759160584189, lng: 20.22692106768336 }
  },
];

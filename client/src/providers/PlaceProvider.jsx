import { createContext } from 'react';
import {useProvidePlaces} from "../../hooks/index.js";
const initialPlaceState = {
  place: { area: '', count: 0 },
  setPlace: () => {},
};

export const PlaceContext = createContext(initialPlaceState);

export const PlaceProvider = ({ children }) => {
  const allPlaces = useProvidePlaces();

  return (
      <PlaceContext.Provider value={allPlaces}>{children}</PlaceContext.Provider>
  );
};
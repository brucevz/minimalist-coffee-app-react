// Custom hook that mimics `useState` but also reads/writes values to localStorage
// Allows us to persist values through refreshes,
// falling back to an initial value if we haven't set anything
import { useState } from "react";
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(
    localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : initialValue
  );

  // return a setter function that calls the normal setStoredValue (normal useState approach)
  // but also sets localStorage value
  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue];
};

import { useEffect, useState } from "react";

export const useLocalStorage = (
  key: string,
  defaultValue: { id: string; name: string; max: number }[]
) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      // return defaultValue();
      return defaultValue;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

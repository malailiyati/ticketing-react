import { useEffect, useState } from "react";
/**
 *
 * @param {string} key
 * @param {any|() => any} initialValue
 * @returns {[value, setValue]}
 */
function useLocalStorage(key, initialValue = "") {
  const [value, setValue] = useState(() => {
    const valueFromLocalStorage = localStorage.getItem(key);
    if (valueFromLocalStorage !== null) {
      return JSON.parse(valueFromLocalStorage);
    }
    if (typeof initialValue === "function") {
      return initialValue();
    }
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue];
  // return { value, setValue };
}

export default useLocalStorage;

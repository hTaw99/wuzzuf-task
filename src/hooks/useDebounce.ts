import { useEffect, useState } from "react";

const useDebounce = (value: string | null, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(id);
    };
  }, [delay, value]);

  return debouncedValue;
};

export default useDebounce;

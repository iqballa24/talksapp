import { useState, useEffect } from 'react';

const useDebounce = (val: string, delay: number) => {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val]);

  return debounceVal;
};

export default useDebounce;

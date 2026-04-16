import { useEffect, useState } from "react";

export const useDebounce = (search: string) => {
  const [word, setWord] = useState<string>("");
  useEffect(() => {
    if (search.length < 1) {
      setWord("");
      return;
    }

    const timeout = setTimeout(() => {
      setWord(search);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return word;
};

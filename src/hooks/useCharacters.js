import { useState, useEffect } from "react";

const fetchCharacters = async (url, setCharacters) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setCharacters(data.results);
  } catch (error) {}
};

const useCharacters = (url) => {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    // async / await ✅
    fetchCharacters(url, setCharacters);
    // Promesas ✅
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => setCharacters(data.results));
  }, [url]);
  return characters;
};

export default useCharacters;

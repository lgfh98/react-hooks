import React, { useState, useEffect } from "react";

const Characters = () => {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {}
  };

  useEffect(() => {
    // Con Promesa ✅
    // fetch(`https://rickandmortyapi.com/api/character/`)
    //   .then((response) => response.json())
    //   .then((data) => setCharacters(data.results));
    // Async / Await ✅
    fetchCharacters(`https://rickandmortyapi.com/api/character/`);
  }, []);

  return (
    <div className="Characters">
      {characters.map((character) => (
        <h2 key={character.id}>{character.name}</h2>
      ))}
    </div>
  );
};

export default Characters;

import React, { useState, useEffect, useReducer, useMemo } from "react";

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState("");

  const fetchCharacters = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCharacters(data.results);
    } catch (error) {}
  };

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: favorite });
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    // Con Promesa ✅
    // fetch(`https://rickandmortyapi.com/api/character/`)
    //   .then((response) => response.json())
    //   .then((data) => setCharacters(data.results));
    // Async / Await ✅
    fetchCharacters(`https://rickandmortyapi.com/api/character/`);
  }, []);

  // Sin Memoization
  // const filteredCharacters = characters.filter((character) => {
  //   return character.name.toLowerCase().includes(search.toLowerCase());
  // });

  const filteredCharacters = useMemo(
    () =>
      characters.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      ),
    [characters, search]
  );

  return (
    <div className="Characters">
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}

      <div className="Search">
        <input type="text" value={search} onChange={handleSearch} />
      </div>

      {filteredCharacters.map((character) => (
        <div key={character.id}>
          <h2 key={character.id}>{character.name}</h2>
          <button type="button" onClick={() => handleClick(character)}>
            Agregar a Favoritos
          </button>
        </div>
      ))}
    </div>
  );
};

export default Characters;

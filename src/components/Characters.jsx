import React, { useState, useEffect, useReducer } from "react";

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
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}
      {characters.map((character) => (
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

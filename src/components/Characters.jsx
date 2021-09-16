import React, {
  useState,
  useReducer,
  useMemo,
  useRef,
  useCallback,
} from "react";

import Search from "./Search";
import useCharacters from "../hooks/useCharacters";

const initialState = {
  favorites: [],
};

const API = "https://rickandmortyapi.com/api/character";

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
  // ------------------------useReducer-------------------------
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  // ---------------------------------------------------------------
  const [search, setSearch] = useState("");
  // -------------------------useRef--------------------------
  const searchInput = useRef(null);
  // ---------------------------------------------------------------

  // -------------------------customHook---------------------
  const characters = useCharacters(API);
  // ---------------------------------------------------------------

  // const fetchCharacters = async (url) => {
  //   try {
  //     const response = await fetch(url);
  //     const data = await response.json();
  //     setCharacters(data.results);
  //   } catch (error) {}
  // };

  const handleClick = (favorite) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: favorite });
  };

  // -------------------------useRef------------------------
  // Sin useRef ❌
  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  // };
  // Con useRef ✅
  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };
  // ---------------------------------------------------------------

  // -----------------------useCallback------------------------
  // Sin useCallback❌
  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);
  // ---------------------------------------------------------------

  // ---------------------useEffect----------------------------
  // useEffect(() => {
  //   // Con Promesa ✅
  //   // fetch(`https://rickandmortyapi.com/api/character/`)
  //   //   .then((response) => response.json())
  //   //   .then((data) => setCharacters(data.results));
  //   // Async / Await ✅
  //   fetchCharacters(`https://rickandmortyapi.com/api/character/`);
  // }, []);
  // ---------------------------------------------------------------

  // -----------------------useMemo----------------------------
  // Sin Memoization ❌
  // const filteredCharacters = characters.filter((character) => {
  //   return character.name.toLowerCase().includes(search.toLowerCase());
  // });

  // Con Memoization ✅
  console.log("characters:", characters);
  const filteredCharacters = useMemo(
    () =>
      characters.filter((character) =>
        character.name.toLowerCase().includes(search.toLowerCase())
      ),
    [characters, search]
  );
  // ---------------------------------------------------------------

  return (
    <div className="Characters">
      {favorites.favorites.map((favorite) => (
        <li key={favorite.id}>{favorite.name}</li>
      ))}

      <Search
        search={search}
        searchInput={searchInput}
        handleSearch={handleSearch}
      />

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

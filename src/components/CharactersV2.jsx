import React, { useState, useEffect, useRef, useReducer } from "react";
import logo from "../images/logoRickAndMorty.png";
import CheckDarkMode from "./CheckDarkMode";
import "../CharactersV2.css";

const initialState = {
  favorites: [],
  results: [],
  info: {},
};

const actionTypes = {
  LOAD_MORE_CHARACTERS: "LOAD_MORE_CHARACTERS",
  ADD_TO_FAVORITES: "ADD_TO_FAVORITES",
};

const charactersReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOAD_MORE_CHARACTERS:
      return {
        ...state,
        info: action.payload.info,
        results: [...state.results, ...action.payload.results],
      };
    case actionTypes.ADD_TO_FAVORITES: {
      const exist = state.favorites.find(
        (character) => character.id === action.payload.id
      );
      if (exist) {
        return state;
      } else {
        return {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
      }
    }
    default:
      return state;
  }
};

const CharactersV2 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [nextPage, setNextPage] = useState(1);
  const [characters, dispatch] = useReducer(charactersReducer, initialState);

  const fetchCharacters = useRef();

  fetchCharacters.current = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${nextPage}`
      );
      const data = await response.json();
      setLoading(false);
      setNextPage(nextPage + 1);
      dispatch({ type: actionTypes.LOAD_MORE_CHARACTERS, payload: data });
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const addToFavorites = (character) => {
    dispatch({ type: actionTypes.ADD_TO_FAVORITES, payload: character });
  };

  useEffect(() => {
    fetchCharacters.current();
  }, []);

  return (
    <div className="container">
      <div className="App">
        <img className="Logo" src={logo} alt="Rick y Morty" />

        <div>
          <CheckDarkMode /> <span className="theme-text">Dark Mode</span>
        </div>

        {error && <h2>{error}</h2>}

        {characters.favorites.length > 0 && (
          <>
            <h3>Favorites:</h3>
            <ul className="row">
              {characters.favorites.map((character) => (
                <li className="col-6 col-md-3" key={character.id}>
                  <CharacterCard character={character} />
                </li>
              ))}
            </ul>
          </>
        )}

        <h3>Characters:</h3>
        <ul className="row">
          {characters.results.map((character) => (
            <li
              className="col-6 col-md-3"
              key={character.id}
              onClick={() => addToFavorites(character)}
            >
              <CharacterCard character={character} />
            </li>
          ))}
        </ul>

        {loading && <div className="lds-dual-ring"></div>}

        {!loading && characters.info.next && (
          <button
            style={{ marginBottom: "25px" }}
            onClick={fetchCharacters.current}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

function CharacterCard(props) {
  const { character } = props;

  return (
    <div
      className="CharacterCard"
      style={{ backgroundImage: `url(${character.image})` }}
    >
      <div className="CharacterCard__name-container text-truncate">
        {character.name}
      </div>
    </div>
  );
}

export default CharactersV2;

import React, { useState, useEffect, useRef } from "react";
import logo from "../images/logoRickAndMorty.png";
import CheckDarkMode from "./CheckDarkMode";
import "../CharactersV2.css";

const CharactersV2 = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [characters, setCharacters] = useState({ results: [], info: {} });
  const [nextPage, setNextPage] = useState(1);

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
      setCharacters({
        info: data.info,
        results: [...characters.results, ...data.results],
      });
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
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

        <ul className="row">
          {characters.results.map((character) => (
            <li className="col-6 col-md-3" key={character.id}>
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

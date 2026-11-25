import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=60"
        );

        const data = await Promise.all(
          response.data.results.map(async (item) => {
            const result = await axios.get(item.url);
            return result.data;
          })
        );

        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

  const types = [
    "all",
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  const filteredPokemon = pokemon.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      selectedType === "all" ||
      item.types.some(
        (type) => type.type.name === selectedType
      );

    return matchesSearch && matchesType;
  });

  const formatName = (name) => {
    return name
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  return (
    <div className="world">

      {/* Background decoration */}
      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>
      <div className="aurora aurora-three"></div>

      <div className="scan-line"></div>

      {/* NAVBAR */}
      <nav className="pokemon-nav">

        <div className="nav-brand">
          <div className="mini-ball">
            <span></span>
          </div>

          <div>
            <strong>POKE</strong>
            <span>WORLD</span>
          </div>
        </div>

        <div className="nav-status">
          <span className="status-dot"></span>
          SYSTEM ONLINE
        </div>

      </nav>

      {/* HERO */}
      <header className="new-hero">

        <div className="hero-left">

          <div className="small-label">
            <span></span>
            POKÉMON RESEARCH CENTER
          </div>

          <h1>
            ENTER THE
            <br />

            <span>POKÉMON</span>

            <br />

            UNIVERSE
          </h1>

          <p>
            Discover powerful creatures, explore their
            abilities and study every detail of your
            favorite Pokémon.
          </p>

          <div className="hero-actions">

            <button
              className="primary-action"
              onClick={() =>
                document
                  .getElementById("collection")
                  .scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Database
              <span>→</span>
            </button>

            <div className="hero-counter">
              <strong>{pokemon.length || 60}+</strong>
              <small>SPECIES<br />DISCOVERED</small>
            </div>

          </div>

        </div>

        <div className="hero-visual">

          <div className="energy-ring ring-1"></div>
          <div className="energy-ring ring-2"></div>
          <div className="energy-ring ring-3"></div>

          <div className="hero-circle"></div>

          <div className="hero-orb"></div>

          <div className="hero-light"></div>

          {!loading && pokemon[24] && (
            <img
              src={
                pokemon[24].sprites.other[
                  "official-artwork"
                ].front_default
              }
              alt="featured pokemon"
              className="hero-pokemon"
            />
          )}

          <div className="floating-card card-top">
            <span>TYPE</span>
            <strong>ELECTRIC</strong>
          </div>

          <div className="floating-card card-bottom">
            <span>POWER LEVEL</span>
            <strong>95.8</strong>
          </div>

        </div>

      </header>

      {/* COLLECTION */}
      <main
        className="container-fluid collection-area"
        id="collection"
      >

        <div className="section-heading">

          <div>
            <div className="small-label">
              <span></span>
              DATABASE / 001
            </div>

            <h2>
              DISCOVER
              <strong> POKÉMON</strong>
            </h2>
          </div>

          <div className="collection-total">
            <strong>{filteredPokemon.length}</strong>
            <span>RESULTS</span>
          </div>

        </div>

        {/* SEARCH PANEL */}
        <div className="control-panel">

          <div className="search-box">

            <span className="search-symbol">
              /
            </span>

            <input
              type="text"
              placeholder="Search Pokémon by name..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <span className="search-key">
              SEARCH
            </span>

          </div>

          <div className="type-filter">

            {types.map((type) => (
              <button
                key={type}
                className={
                  selectedType === type
                    ? `type-filter-btn active ${type}`
                    : `type-filter-btn ${type}`
                }
                onClick={() =>
                  setSelectedType(type)
                }
              >
                {type}
              </button>
            ))}

          </div>

        </div>

        {/* LOADING */}
        {loading ? (
          <div className="loading-new">

            <div className="loading-core">
              <div></div>
            </div>

            <h3>INITIALIZING DATABASE</h3>

            <div className="loading-bar">
              <span></span>
            </div>

            <p>Connecting to Pokémon Research Network...</p>

          </div>
        ) : (
          <div className="pokemon-grid">

            {filteredPokemon.map((item, index) => (

              <article
                className="new-pokemon-card"
                key={item.id}
                style={{
                  animationDelay: `${index * 0.04}s`,
                }}
                onClick={() =>
                  navigate(`/pokemon/${item.id}`)
                }
              >

                <div className="card-number">
                  #{String(item.id).padStart(3, "0")}
                </div>

                <div className="card-light"></div>

                <div className="card-image">

                  <div className="image-shadow"></div>

                  <img
                    src={
                      item.sprites.other[
                        "official-artwork"
                      ].front_default
                    }
                    alt={item.name}
                  />

                </div>

                <div className="card-info">

                  <div className="card-types">

                    {item.types.map((type) => (
                      <span
                        key={type.type.name}
                        className={`new-type ${type.type.name}`}
                      >
                        {type.type.name}
                      </span>
                    ))}

                  </div>

                  <h3>{formatName(item.name)}</h3>

                  <div className="card-bottom">

                    <span>
                      ID {String(item.id).padStart(3, "0")}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(
                          `/pokemon/${item.id}`
                        );
                      }}
                    >
                      VIEW
                      <span>↗</span>
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>
        )}

        {!loading &&
          filteredPokemon.length === 0 && (
            <div className="no-results">
              <h2>NO POKÉMON FOUND</h2>
              <p>
                Try another search or select a
                different type.
              </p>
            </div>
          )}

      </main>

      <footer className="new-footer">

        <div className="footer-logo">
          POKE<span>WORLD</span>
        </div>

        <p>
          Pokémon Research & Discovery Database
        </p>

        <div className="footer-line"></div>

        <small>
          DATA PROVIDED BY POKÉAPI
        </small>
 <small> <br />
          MADED BY VICKY
        </small>
      </footer>

    </div>





  );
};

export default Pokemon;

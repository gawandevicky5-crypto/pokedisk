import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const PokemonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const formatName = (name) => {
    return name
      .split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const getStatPercentage = (value) => {
    return Math.min((value / 150) * 100, 100);
  };

  if (loading) {
    return (
      <div className="details-world">

        <div className="loading-new">

          <div className="loading-core">
            <div></div>
          </div>

          <h3>LOADING PROFILE</h3>

          <div className="loading-bar">
            <span></span>
          </div>

        </div>

      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  return (
    <div className="details-world">

      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>

      <nav className="pokemon-nav">

        <div
          className="nav-brand"
          onClick={() => navigate("/")}
        >
          <div className="mini-ball">
            <span></span>
          </div>

          <div>
            <strong>POKE</strong>
            <span>WORLD</span>
          </div>
        </div>

        <button
          className="return-button"
          onClick={() => navigate("/")}
        >
          ← DATABASE
        </button>

      </nav>

      <main className="details-container">

        {/* TOP INFO */}
        <div className="details-top">

          <div className="details-title-area">

            <span className="profile-label">
              POKÉMON PROFILE
            </span>

            <div className="details-number">
              #{String(pokemon.id).padStart(3, "0")}
            </div>

            <h1>
              {formatName(pokemon.name)}
            </h1>

            <div className="details-types">

              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className={`new-type large ${type.type.name}`}
                >
                  {type.type.name}
                </span>
              ))}

            </div>

          </div>

          <div className="profile-status">
            <span></span>
            PROFILE VERIFIED
          </div>

        </div>

        {/* MAIN PROFILE */}
        <section className="profile-layout">

          {/* IMAGE */}
          <div className="profile-visual">

            <div className="profile-grid"></div>

            <div className="profile-ring ring-a"></div>
            <div className="profile-ring ring-b"></div>
            <div className="profile-ring ring-c"></div>

            <div className="profile-glow"></div>

            <img
              src={
                pokemon.sprites.other[
                  "official-artwork"
                ].front_default
              }
              alt={pokemon.name}
            />

            <div className="visual-label">
              <span>SPECIMEN</span>
              <strong>
                #{String(pokemon.id).padStart(3, "0")}
              </strong>
            </div>

          </div>

          {/* INFORMATION */}
          <div className="profile-information">

            <div className="info-header">
              <span>01</span>
              <h2>BASIC INFORMATION</h2>
            </div>

            <div className="information-grid">

              <div className="detail-box">
                <span>HEIGHT</span>
                <strong>
                  {(pokemon.height / 10).toFixed(1)}
                  <small> M</small>
                </strong>
              </div>

              <div className="detail-box">
                <span>WEIGHT</span>
                <strong>
                  {(pokemon.weight / 10).toFixed(1)}
                  <small> KG</small>
                </strong>
              </div>

              <div className="detail-box">
                <span>BASE EXPERIENCE</span>
                <strong>
                  {pokemon.base_experience}
                </strong>
              </div>

              <div className="detail-box">
                <span>ABILITY COUNT</span>
                <strong>
                  {pokemon.abilities.length}
                </strong>
              </div>

            </div>

            {/* ABILITIES */}
            <div className="info-header ability-heading">
              <span>02</span>
              <h2>ABILITIES</h2>
            </div>

            <div className="ability-list">

              {pokemon.abilities.map(
                (ability, index) => (
                  <div
                    className="ability-item"
                    key={ability.ability.name}
                  >

                    <div className="ability-index">
                      0{index + 1}
                    </div>

                    <div>
                      <strong>
                        {formatName(
                          ability.ability.name
                        )}
                      </strong>

                      <small>
                        {ability.is_hidden
                          ? "HIDDEN ABILITY"
                          : "PRIMARY ABILITY"}
                      </small>
                    </div>

                    <span>→</span>

                  </div>
                )
              )}

            </div>

          </div>

        </section>

        {/* STATS */}
        <section className="stats-section">

          <div className="info-header">
            <span>03</span>
            <h2>BATTLE STATISTICS</h2>
          </div>

          <div className="stats-layout">

            {pokemon.stats.map((stat) => {

              const value = stat.base_stat;

              return (
                <div
                  className="new-stat"
                  key={stat.stat.name}
                >

                  <div className="stat-top">

                    <span>
                      {formatName(
                        stat.stat.name
                      )}
                    </span>

                    <strong>
                      {value}
                    </strong>

                  </div>

                  <div className="new-stat-bar">
                    <span
                      style={{
                        width: `${getStatPercentage(
                          value
                        )}%`,
                      }}
                    ></span>
                  </div>

                  <div className="stat-scale">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                    <span>150</span>
                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* MOVEMENT */}
        <div className="profile-actions">

          <button
            onClick={() => {
              const next =
                Number(id) >= 60
                  ? 1
                  : Number(id) + 1;

              navigate(`/pokemon/${next}`);
            }}
          >
            NEXT POKÉMON
            <span>→</span>
          </button>

          <button
            onClick={() => navigate("/")}
          >
            RETURN TO DATABASE
          </button>

        </div>

      </main>

    </div>
  );
};

export default PokemonDetails;

import React from "react";
import { Link } from "react-router-dom";

function PokemonCard({ pokemon }) {
  return (
    <Link to={`/pokemon/${pokemon.name}`} className="Cards">
      <div className="pokemon-poster" title={pokemon.name}>
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="pokemon-image"
          loading="lazy"
        />
      </div>
      <div className="pokemon-info">
        <h3>{pokemon.name.toUpperCase()}</h3>
        <p>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      </div>
    </Link>
  );
}

export default PokemonCard;

import React from "react";

function PokemonCard({ pokemon }) {
  return (
    <div className="Cards">
      <div className="pokemon-poster" title={pokemon.name}>
        <img
          src={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>
      <div className="pokemon-info">
        <h3>{pokemon.name.toUpperCase()}</h3>
        <p>Type: {pokemon.types.map((t) => t.type.name).join(", ")}</p>
      </div>
    </div>
  );
}

export default PokemonCard;

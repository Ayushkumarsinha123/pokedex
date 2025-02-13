import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";

function PokemonDetail () {
  const {name} = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!response.ok) throw new Error("pokemon not found");

        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonDetails();
  }, [name]);

  if(loading) return <p>loading...</p>
  if(error) return <p>{error}</p>

  return (
    <div className="pokemon-details">
      <h1 className="pokemon-card">{pokemon.name.toUpperCase()}</h1>
      <img src ={pokemon.sprites.other["official-artwork"].front_default}
          alt={pokemon.name}
          className="pokemon-image"></img>
        
        <p><b>height</b> : {pokemon.height} inch</p>
        <p><b>weight</b> : {pokemon.weight} pounds</p>
        
    </div>
  )

}
export default PokemonDetail;
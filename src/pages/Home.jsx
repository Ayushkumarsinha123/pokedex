import { useState ,useEffect} from "react";
import PokemonCard from "../components/pokemonCard";
import { getAllPokemon, searchPokemon } from "../service/spi";

function Home() {


  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [error , setError] = useState(null)

  useEffect(() => {
    getAllPokemon().then(setPokemonList)
  },[]);

  const HandleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setError(null);
      const pokemon = await searchPokemon(searchTerm);
      setSearchedPokemon(pokemon);
    } catch (err) {
      setError("Pokémon not found");
        setSearchedPokemon(null);
    }


  }
return (
  <div className="main-body">
    <form onSubmit={HandleSearch} 
    className="search-form"
    >
     <input type="text" placeholder="name of pokemon..." 
     className="search-input"
     value={searchTerm}
     onChange={(e) => {setSearchTerm(e.target.value)}}
     />
    
     <button type="submit" className="search-button">search</button>
    </form>
    {error &&<p>{error}</p>}
    <div className="pokemon-grid">
      {searchedPokemon ? (
    <PokemonCard key={searchedPokemon.id} pokemon= {searchedPokemon}/>
  ) : (
    pokemonList.map((pokemon) => (
      < PokemonCard key={pokemon.id} pokemon={pokemon}/>
    ))
  )}
    </div>
  </div>
  
);
}
export default Home;
import { useState ,useEffect, useRef, use} from "react";
import PokemonCard from "../components/pokemonCard";
import { getAllPokemon, searchPokemon } from "../service/spi";

function Home() {

  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error , setError] = useState(null);
  const [offset, setOffset]= useState(0);
  const observer = useRef(null);

 useEffect(() => {
  const fetchPokemon = async () => {
    setLoading(true);
    const newPokemon = await getAllPokemon(offset, 10);
    setPokemonList((prev) => [...prev, ...newPokemon]);
    setLoading(false);
  }
  fetchPokemon();
 }, [offset]);


 useEffect(() => {
  observer.current = new IntersectionObserver(
    (entries) => {
      if(entries[0].isIntersecting) {
        setOffset((prev)=> prev + 10);
      }
    },
    {threshold: 1.0}
  );

  if(observer.current && document.getElementById("load-more")) {
    observer.current.observe(document.getElementById("load-more"));
  }

  return () => observer.current?.disconnect();
 }, []);



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
    <div id="load-more" style={{height: "10px"}}></div>
    {loading && <p>Loading more pokemon....</p>}
  </div>
  
);
}
export default Home;
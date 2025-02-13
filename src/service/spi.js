const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export const getAllPokemon = async (offset = 0,limit = 10) => {
  const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
  const data = await response.json();

  if (!data.results) {
    throw new Error("API response does not contain results");
  }

  const pokemonDetails = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    })
  );

  return pokemonDetails;
};
export const searchPokemon = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/${name.toLowerCase()}`);
    if (!response.ok) throw new Error("Pokémon not found");
    return await response.json();
  } catch (error) {
    return null;
  }
};
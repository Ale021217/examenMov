// api.js

const BASE_URL = 'https://pokeapi.co/api/v2';

export const getPokemonList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon?offset=0&limit=151`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching Pokemon list:', error);
    throw error;
  }
};

export const getPokemonDetails = async (pokemonName) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${pokemonName}`);
    
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching details for ${pokemonName}:`, error);
    throw error;
  }

};

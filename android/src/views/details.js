import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { getPokemonDetails } from '../Api/api';

const PokemonDetails = ({ route }) => {
  const { pokemon } = route.params;
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemonDetails = async () => {
    try {
      const data = await getPokemonDetails(pokemon.name);
      setDetails(data);
    } catch (error) {
      console.error(`Error fetching details for ${pokemon.name}:`, error);
      setError(error.message || 'Error fetching Pokemon details');
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image style={styles.pokemonImage} source={{ uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png` }} />
      <Text style={styles.title}>{details.name}</Text>
      <Text>Number: {details.id}</Text>
      <Text>Height: {details.height}</Text>
      <Text>Weight: {details.weight}</Text>
      <Text>Types: {details.types.map(type => type.type.name).join(', ')}</Text>
      {/* Add more details as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  pokemonImage: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcccc',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default PokemonDetails;

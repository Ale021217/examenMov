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
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  if (!details) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    <Image source={require('../imgs/logoPM.png')} />
      <View style={styles.detailsContainer}>
        <Image style={styles.pokemonImage} source={{ uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${details.name}.png` }} />
        <Text style={styles.title}>{details.name}</Text>
        <View style={styles.statContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Number</Text>
            <Text style={styles.statValue}>{details.id}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Height</Text>
            <Text style={styles.statValue}>{details.height}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Weight</Text>
            <Text style={styles.statValue}>{details.weight}</Text>
          </View>
        </View>
        <Text style={styles.typeLabel}>Types</Text>
        <View style={styles.typeContainer}>
          {details.types.map((type, index) => (
            <Text key={index} style={styles.type}>{type.type.name}</Text>
          ))}
        </View>
        {/* Add more details as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  detailsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    elevation: 3,
    alignItems: 'center',
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
    resizeMode: 'contain',
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  typeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
  },
  type: {
    marginRight: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#ffcc00',  // Color amarillo
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffcccc',  // Color rojo
    borderRadius: 8,
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default PokemonDetails;

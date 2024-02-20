import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPokemonList } from '../Api/api';

const Home = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPokemonList();
        setPokemonList(data);
      } catch (error) {
        console.error('Error in fetchData:', error);
      }
    };

    fetchData();
  }, []);

  const handlePokemonPress = (pokemon) => {
    console.log('Pokemon pressed:', pokemon); // Añade un console.log para verificar
    navigation.navigate('PokemonDetails', { pokemon });
  };

  const renderPokemonCard = ({ item }) => (
    <TouchableOpacity onPress={() => handlePokemonPress(item)}>
      <View style={styles.pokemonCard}>
        <Image
          style={styles.pokemonImage}
          source={{ uri: `https://img.pokemondb.net/sprites/omega-ruby-alpha-sapphire/dex/normal/${item.name}.png` }}
        />
        <Text style={styles.pokemonName}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokemon List</Text>
      <FlatList
        data={pokemonList}
        keyExtractor={(pokemon) => pokemon.name}
        renderItem={renderPokemonCard}
        numColumns={2}
        columnWrapperStyle={styles.pokemonContainer}
      />
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
  pokemonContainer: {
    justifyContent: 'space-between',
  },
  pokemonCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 3,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  pokemonName: {
    fontSize: 16,
    color: '#333',
  },
});

export default Home;

// App.tsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './android/src/views/home';
import PokemonDetails from './android/src/views/details';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }} />
        <Stack.Screen name="PokemonDetails" component={PokemonDetails} options={{ title: 'Pokemon Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

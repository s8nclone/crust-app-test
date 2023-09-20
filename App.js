import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ContextProvider } from './hooks/context';
import { AppNavigator } from './components/navigator';

const App = () => {

  return (
    <ContextProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ContextProvider>
  );
}


export default App


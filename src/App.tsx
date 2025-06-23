import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Navigation from './navigation/Navigation';

interface AppProps {
  // Add any prop types here
}

const App: React.FC<AppProps> = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <StatusBar
        translucent={Platform.OS === 'ios'}
        barStyle={'dark-content'}
        backgroundColor="transparent"
      />
      <Navigation />
    </GestureHandlerRootView>
  );
};

export default App;


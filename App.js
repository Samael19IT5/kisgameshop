import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Navigation from './src/navigations/Navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

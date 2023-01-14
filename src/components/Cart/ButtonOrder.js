import {StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../theme/styles';

export default function ButtonOrder(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.doOrder}>
      <Text style={styles.text}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    backgroundColor: colors.red,
    height: 42,
    borderRadius: 8,
  },
  text: {
    color: colors.text,
    fontWeight: 'bold',
  },
});

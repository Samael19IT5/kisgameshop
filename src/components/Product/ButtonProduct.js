import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../theme/styles';

export default function ButtonProduct(props) {
  return (
    <TouchableOpacity style={styles.container} onPress={props.doCart}>
      <Text style={styles.text}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    backgroundColor: colors.red,
    height: 42,
    borderRadius: 8,
  },
  text: {
    color: colors.text,
    fontWeight: 'bold',
  },
});

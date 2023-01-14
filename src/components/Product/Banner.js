import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../theme/styles';

export default function Banner(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'center',
    marginVertical: 8,
  },
  text: {
    textTransform: 'uppercase',
    margin: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
});

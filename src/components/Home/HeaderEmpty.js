import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../theme/styles';

export default function HeaderEmpty(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>{props.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});

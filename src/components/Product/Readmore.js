import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {colors} from '../../theme/styles';
import React from 'react';

export default function Readmore(props) {
  return (
    <TouchableOpacity onPress={props.doSee}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    color: colors.red,
    fontSize: 16,
  },
});

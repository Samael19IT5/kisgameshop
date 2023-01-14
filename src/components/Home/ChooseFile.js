import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../theme/styles';

export default function ChooseFile(props) {
  return (
    <TouchableOpacity onPress={props.doThing}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginRight: 8,
    marginVertical: 8,
    backgroundColor: colors.blue,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
});

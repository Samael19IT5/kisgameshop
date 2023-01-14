import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {colors} from '../../theme/styles';

export default function NumberInput({...props}) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Liên hệ</Text>
      <View>
        <TextInput keyboardType="phone-pad" style={styles.input} {...props} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: colors.yellow,
    padding: 4,
  },
});

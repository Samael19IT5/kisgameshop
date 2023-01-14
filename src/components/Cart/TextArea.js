import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {colors} from '../../theme/styles';

export default function TextArea() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Địa chỉ</Text>
      <View>
        <TextInput multiline={true} numberOfLines={8} style={styles.input} />
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
    borderWidth: 1,
    borderColor: colors.yellow,
    padding: 4,
    textAlignVertical: 'top',
  },
});

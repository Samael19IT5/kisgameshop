import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

export default function Paragraph(props) {
  return <Text numberOfLines={1} style={styles.text} {...props} />;
}

const styles = StyleSheet.create({
  text: {
    width: '35%',
    marginLeft: 8,
    marginVertical: 4,
    fontSize: 16,
    lineHeight: 21,
  },
});

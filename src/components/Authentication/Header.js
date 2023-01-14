import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {colors} from '../../theme/styles';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: colors.blue,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});

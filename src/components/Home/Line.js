import {View, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../theme/styles';

export default function Line() {
  return (
    <View
      style={{
        marginVertical: 4,
        marginHorizontal: 8,
        borderBottomColor: colors.blue,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
  );
}

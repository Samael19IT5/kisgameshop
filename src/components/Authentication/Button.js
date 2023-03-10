import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {colors} from '../../theme/styles';

export default function Button({mode, style, ...props}) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && {backgroundColor: colors.text},
        style,
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
    backgroundColor: colors.blue,
  },
  text: {
    color: colors.text,
    fontWeight: 'bold',
    fontSize: 13,
    lineHeight: 26,
  },
});

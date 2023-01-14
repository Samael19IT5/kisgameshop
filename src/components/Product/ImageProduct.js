import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export default function ImageProduct(props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: props.image,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: 300,
    height: 300,
  },
});

import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

export default function ItemOrder(props) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: props.image,
        }}
      />
      <View style={styles.content}>
        <Text style={styles.text}>{props.name}</Text>
        <View style={styles.value}>
          <Text>{props.price}đ</Text>
          <Text>x{props.quantity}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  content: {
    flex: 1,
    paddingVertical: 2,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

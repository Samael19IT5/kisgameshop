import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../theme/styles';

export default function Info(props) {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <TouchableOpacity onPress={props.doSetting}>
          <Icon name="gear" style={styles.icon}></Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.doCart}>
          <Icon name="shopping-cart" style={styles.icon}></Icon>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Image
          style={styles.image}
          source={{
            uri: props.image,
          }}
        />
        <View>
          <Text style={styles.name}>{props.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
  },
  bar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  info: {
    flexDirection: 'row',
  },
  icon: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: colors.text,
    fontSize: 26,
  },
  image: {
    width: 75,
    height: undefined,
    margin: 8,
    aspectRatio: 1,
    borderRadius: 45,
  },
  name: {
    color: colors.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

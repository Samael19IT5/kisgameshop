import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {colors} from '../../theme/styles';
import {useNavigation} from '@react-navigation/native';

function numberWithCommas(x) {
  if (x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}

export default function ProductCard(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductScreen', {idProduct: props.id})
      }>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: props.image,
          }}
        />
        <View style={styles.info}>
          <Text numberOfLines={1} style={styles.text}>
            {props.name}
          </Text>
          <Text style={styles.price}>
            {numberWithCommas(props.price) + ' đ'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width / 2.25,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
  },
  info: {
    marginHorizontal: 4,
  },
  text: {
    fontSize: 14,
    color: colors.black,
  },
  price: {
    fontSize: 14,
    color: colors.red,
  },
});

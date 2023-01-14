import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

export default function CategoryCard(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('FilterScreen', {id: props.id, type: 'category'});
      }}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: props.image}} />
        <Text numberOfLines={2} style={styles.text}>
          {props.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('screen').width / 5,
    margin: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 4,
  },
});

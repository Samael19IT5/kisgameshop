import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../theme/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function Banner(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FilterScreen', {id: props.id, type: 'banner'});
        }}>
        <Icon name="angle-right" style={styles.icon}></Icon>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    backgroundColor: colors.yellow,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    textTransform: 'uppercase',
    margin: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.text,
  },
  icon: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    color: colors.text,
    fontSize: 20,
  },
});

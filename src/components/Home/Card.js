import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../theme/styles';
import {useNavigation} from '@react-navigation/native';

export default function Card(props) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ReceiptScreen', {
          idOrder: props.id,
          status: props.status,
          contact: props.contact,
          address: props.address,
        })
      }>
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.title}>{props.name}</Text>
          <Text> {props.time} </Text>
        </View>
        <>
          <View style={{justifyContent: 'center'}}>
            <Icon
              name="angle-right"
              style={[{fontSize: 30, color: 'black'}]}></Icon>
          </View>
        </>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    padding: 4,
    height: 70,
    flexDirection: 'row',
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'stretch',
    textColor: 'black',
  },
  title: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

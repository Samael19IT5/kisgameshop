import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../theme/styles';

export default function HeaderSave(props) {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <TouchableOpacity onPress={props.goBack}>
          <Icon name="angle-left" style={styles.icon}></Icon>
        </TouchableOpacity>
        <View style={styles.center}>
          <Text style={styles.brand}>{props.name}</Text>
        </View>
        <View style={styles.count}>
          <TouchableOpacity onPress={props.save}>
            <Text style={styles.text}>LƯU</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
  },
  center: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  brand: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  icon: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: colors.text,
    fontSize: 30,
  },
  count: {
    marginVertical: 4,
    marginRight: 8,
    width: 35,
    height: 35,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
});

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../theme/styles';

export default function Option(props) {
  return (
    <TouchableOpacity onPress={props.doOption}>
      <View style={styles.container}>
        <Icon
          name={props.icon}
          style={[
            styles.icon,
            {color: props.color, fontSize: props.size},
          ]}></Icon>
        <Text style={styles.text}>{props.name}</Text>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          <Icon name="angle-right" style={[styles.icon, {fontSize: 24}]}></Icon>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    height: 50,
  },
  icon: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  text: {
    fontSize: 15,
    color: colors.black,
  },
});

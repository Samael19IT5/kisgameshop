import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../theme/styles';

export default function Notify(props) {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <Image
            style={styles.image}
            source={{
              uri: props.image,
            }}
          />
          <Text
            multiline
            style={[styles.text, {flexShrink: 1}]}
            numberOfLines={3}>
            {props.content}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 75}}></View>
          <Text>{props.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    textColor: 'black',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  image: {
    marginRight: 10,
    width: 65,
    height: 65,
    borderRadius: 45,
  },
  text: {
    color: 'black',
  },
});

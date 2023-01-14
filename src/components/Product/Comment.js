import {StyleSheet, Text, View, Image} from 'react-native';
import {colors} from '../../theme/styles';
import React from 'react';

export default function Comment(props) {
  return (
    <View>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: props.image,
          }}
        />
        <View>
          <Text style={styles.name}>{props.name}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.content}>{props.content}</Text>
          </View>
          <Text style={{marginLeft: 10}}>{props.time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 8,
    flexDirection: 'row',
  },
  image: {
    width: 45,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 45,
  },
  name: {
    marginLeft: 10,
    marginBottom: 8,
    fontSize: 16,
    color: colors.black,
  },
  content: {
    marginLeft: 10,
    flexShrink: 1,
  },
});

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {Component, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../theme/styles';
import {useNavigation} from '@react-navigation/native';

export default function Header(props) {
  const navigation = useNavigation();
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View style={styles.search}>
          <Icon name="search" style={styles.icons}></Icon>
          <TextInput
            style={styles.input}
            returnKeyType="search"
            placeholder="Tìm kiếm sản phẩm..."
            defaultValue={text}
            onChangeText={newText => setText(newText)}
            onSubmitEditing={() =>
              navigation.navigate('SearchScreen', {vls: text})
            }></TextInput>
        </View>
        <TouchableOpacity onPress={props.doCart}>
          <Icon name="shopping-cart" style={styles.icon}></Icon>
        </TouchableOpacity>
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
  icon: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 26,
  },
  icons: {
    fontSize: 20,
    marginLeft: 4,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 30,
    fontSize: 16,
    padding: 0,
    color: colors.secondary,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginVertical: 6,
    marginLeft: 8,
    padding: 2,
    backgroundColor: colors.text,
    borderRadius: 8,
  },
});

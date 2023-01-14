import {StyleSheet, Text, View, StatusBar} from 'react-native';
import HeaderBack from '../../components/Home/HeaderBack';
import React from 'react';

export default function InstructionScreen({navigation}) {
  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="#3FC1A5" />
      <HeaderBack name="TRUNG TÂM TRỢ GIÚP" goBack={navigation.goBack} />
      <View style={styles.container}>
        <Text>Tự mò đi bạn</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

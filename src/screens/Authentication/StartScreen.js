import React, {useState, useEffect} from 'react';
import Background from '../../components/Authentication/Background';
import Logo from '../../components/Authentication/Logo';
import Header from '../../components/Authentication/Header';
import Button from '../../components/Authentication/Button';
import Paragraph from '../../components/Authentication/Paragraph';
import {colors} from '../../theme/styles';
import {auth} from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatusBar} from 'react-native';

export default function StartScreen({navigation}) {
  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user');
        if (jsonValue) {
          const user = JSON.parse(jsonValue);
          if (user) {
            navigation.reset({
              index: 0,
              routes: [{name: 'BottomTabs'}],
            });
          }
        }
      } catch (e) {}
    };
    getData();
  }, []);

  return (
    <Background>
      <StatusBar backgroundColor="#374F8A" />
      <Logo />
      <Header>Chào mừng đến với KIS</Header>
      <Paragraph>KIS là nền tảng boardgame số 1 trong mơ.</Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}>
        ĐĂNG NHẬP
      </Button>
      <Button
        mode="outlined"
        labelStyle={{color: colors.blue}}
        onPress={() => navigation.navigate('RegisterScreen')}>
        ĐĂNG KÝ
      </Button>
    </Background>
  );
}

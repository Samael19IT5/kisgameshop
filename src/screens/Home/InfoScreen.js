import {StyleSheet, Text, View, Alert, StatusBar} from 'react-native';
import Info from '../../components/Home/Info';
import Option from '../../components/Home/Option';
import React, {useState, useEffect} from 'react';
import {db, auth} from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {colors} from '../../theme/styles';

export default function InfoScreen({navigation}) {
  const [user, setUser] = React.useState([]);
  const [name, setName] = React.useState();
  const [image, setImage] = React.useState();

  const signOut = () => {
    Alert.alert('Đăng xuất khỏi KIS', 'Bạn có chắc muốn đăng xuất?', [
      {
        text: 'Có',
        onPress: () => {
          clearAll = async () => {
            try {
              await AsyncStorage.clear();
            } catch (e) {}
            console.log('Done.');
          };
          clearAll();
          navigation.navigate('StartScreen');
        },
      },
      {
        text: 'Không',
        onPress: () => {},
      },
    ]);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user');
        if (jsonValue) {
          const store = JSON.parse(jsonValue);
          var docRef = db.collection('user').doc(store.uid);
          await docRef
            .get()
            .then(doc => {
              if (doc.exists) {
                setUser({id: doc.id, ...doc.data()});
              } else {
                console.log('No such document!');
              }
            })
            .catch(error => {
              console.log('Error getting document:', error);
            });
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchItems();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3FC1A5" />
      <Info
        name={user.username}
        image={user.image}
        doCart={() => navigation.navigate('CartScreen')}
        doSetting={() => navigation.navigate('OptionScreen')}
      />
      <Option
        name="Thiết lập tài khoản"
        icon="user-o"
        color={colors.blue}
        size={24}
        doOption={() => navigation.navigate('OptionScreen')}
      />
      <Option
        name="Trung tâm trợ giúp"
        icon="question-circle-o"
        color={colors.green}
        size={26}
        doOption={() => navigation.navigate('InstructionScreen')}
      />
      <Option
        name="Đăng xuất"
        icon="sign-out"
        color={colors.red}
        size={26}
        doOption={signOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

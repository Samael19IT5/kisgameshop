import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderSave from '../../components/Home/HeaderSave';
import ChooseFile from '../../components/Home/ChooseFile';
import {colors} from '../../theme/styles';
import {db, auth} from '../../../firebase';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OptionScreen({navigation, route}) {
  const [uid, setUid] = React.useState();
  const [username, setUsername] = React.useState();
  const [image, setImage] = React.useState();
  const [phone, setPhone] = React.useState();
  const [address, setAddress] = React.useState();
  const [upload, setUpload] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    try {
      const fetchInfo = async () => {
        const jsonValue = await AsyncStorage.getItem('@user');
        if (jsonValue) {
          const store = JSON.parse(jsonValue);
          userRef = db.collection('user').doc(store.uid).get();
          await userRef.then(doc => {
            setUid(doc.id);
            setUsername(doc.data().username);
            setImage(doc.data().image);
            setPhone(doc.data().phone);
            setAddress(doc.data().address);
          });
        }
      };
      fetchInfo();
    } catch (error) {}
  }, []);

  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 450,
      height: 450,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        if (image.path) {
          setImage(image.path);
          setUpload(true);
        }
      })
      .catch(e => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          console.log(e);
          Alert.alert('Lỗi!');
        }
      });
  };

  const takeImage = () => {
    ImagePicker.openCamera({
      width: 450,
      height: 450,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        if (image.path) {
          setImage(image.path);
          setUpload(true);
        }
      })
      .catch(e => {
        if (e.code !== 'E_PICKER_CANCELLED') {
          console.log(e);
          Alert.alert('Lỗi!');
        }
      });
  };

  const saveOptions = async () => {
    setLoading(true);
    console.log('save options');
    if (upload) {
      const file = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => {
          reject(new TypeError('failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', image, true);
        xhr.send(null);
      });
      var storageRef = firebase.storage().ref();
      var imageRef = storageRef.child('user/' + uid + '.jpg');
      imageRef.put(file).then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          var userRef = db.collection('user').doc(uid);
          return userRef
            .update({
              username: username,
              phone: phone,
              address: address,
              image: downloadURL,
            })
            .then(() => {
              console.log('Document successfully updated!');
              navigation.reset({
                index: 0,
                routes: [{name: 'BottomTabs'}],
              });
            })
            .catch(error => {
              console.error('Error updating document: ', error);
            });
        });
      });
    } else {
      var userRef = db.collection('user').doc(uid);
      return userRef
        .update({
          username: username,
          phone: phone,
          address: address,
          image: image,
        })
        .then(() => {
          console.log('Document successfully updated!');
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabs'}],
          });
        })
        .catch(error => {
          console.error('Error updating document: ', error);
        });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
          </View>
        </>
      ) : (
        <>
          <StatusBar backgroundColor="#3FC1A5" />
          <HeaderSave
            name="THIẾT LẬP TÀI KHOẢN "
            goBack={navigation.goBack}
            save={saveOptions}
          />
          <View style={styles.content}>
            <Text style={styles.text}>Ảnh đại diện:</Text>
            <Image
              style={styles.image}
              source={{
                uri: image,
              }}
            />
            <View style={{flexDirection: 'row'}}>
              <ChooseFile name="Chụp ảnh" doThing={takeImage} />
              <ChooseFile name="Tải ảnh lên" doThing={chooseImage} />
            </View>
            <Text style={styles.text}>Tên người dùng:</Text>
            <TextInput
              onChangeText={newText => setUsername(newText)}
              style={styles.input}
              value={username}
            />
            <Text style={styles.text}>Số điện thoại:</Text>
            <TextInput
              keyboardType="phone-pad"
              onChangeText={newText => setPhone(newText)}
              style={styles.input}
              value={phone}
            />
            <Text style={styles.text}>Địa chỉ:</Text>
            <TextInput
              onChangeText={newText => setAddress(newText)}
              style={[styles.input, {height: 120, textAlignVertical: 'top'}]}
              value={address}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 8,
  },
  text: {
    color: colors.black,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    paddingLeft: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
    fontSize: 18,
    marginBottom: 8,
  },
  image: {
    width: '30%',
    height: undefined,
    aspectRatio: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

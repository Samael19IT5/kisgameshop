import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from 'react-native';
import {Text} from 'react-native-paper';
import Background from '../../components/Authentication/Background';
import Logo from '../../components/Authentication/Logo';
import Header from '../../components/Authentication/Header';
import Button from '../../components/Authentication/Button';
import TextInput from '../../components/Authentication/TextInput';
import BackButton from '../../components/Authentication/BackButton';
import {colors} from '../../theme/styles';
import {emailValidator} from '../../utils/emailValidator';
import {passwordValidator} from '../../utils/passwordValidator';
import {nameValidator} from '../../utils/nameValidator';
import {auth, db} from '../../../firebase';
import {serverTimestamp} from 'firebase/firestore';
import Toast from 'react-native-toast-message';

export default function RegisterScreen({navigation}) {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onSignUpPressed = () => {
    Keyboard.dismiss();
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(userCredentials => {
        userCredentials.user.updateProfile({
          displayName: name.value,
        });
        const user = userCredentials.user;
        db.collection('user').doc(user.uid).set({
          username: name.value,
          email: user.email,
          created_at: serverTimestamp(),
        });
      });
    Toast.show({
      type: 'success',
      text1: 'Thành công!',
      text2: 'Đã tạo tài khoản, mời bạn đăng nhập👋',
    });
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'StartScreen'}],
      });
    }, 1500);
  };

  return (
    <Background>
      <StatusBar backgroundColor="#374F8A" />
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Tạo tài khoản</Header>
      <TextInput
        label="Username"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({value: text, error: ''})}
        error={!!name.error}
        errorText={name.error}
        theme={{colors: {primary: colors.blue, underlineColor: 'transparent'}}}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        theme={{colors: {primary: colors.blue, underlineColor: 'transparent'}}}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        theme={{colors: {primary: colors.blue, underlineColor: 'transparent'}}}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{marginTop: 24}}>
        ĐĂNG KÝ
      </Button>
      <View style={styles.row}>
        <Text>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: colors.blue,
  },
});

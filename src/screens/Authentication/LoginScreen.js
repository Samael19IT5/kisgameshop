import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  StatusBar,
  Alert,
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
import {auth, db} from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    }
    auth
      .signInWithEmailAndPassword(email.value, password.value)
      .then(userCredentials => {
        const user = userCredentials.user;
        AsyncStorage.setItem('@user', JSON.stringify(user));
        navigation.reset({
          index: 0,
          routes: [{name: 'BottomTabs'}],
        });
      })
      .catch(e => {
        Alert.alert(
          'Không thành công!',
          'Vui lòng kiểm tra lại email hoặc mật khẩu!',
        );
      });
  };

  return (
    <Background>
      <StatusBar backgroundColor="#374F8A" />
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Chào mừng trở lại.</Header>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        ĐĂNG NHẬP
      </Button>
      <View style={styles.row}>
        <Text style={{color: colors.black}}>Không có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: colors.blue,
  },
});

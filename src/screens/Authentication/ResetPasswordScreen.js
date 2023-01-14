import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import Background from '../../components/Authentication/Background';
import Logo from '../../components/Authentication/Logo';
import Header from '../../components/Authentication/Header';
import Button from '../../components/Authentication/Button';
import TextInput from '../../components/Authentication/TextInput';
import BackButton from '../../components/Authentication/BackButton';
import {emailValidator} from '../../utils/emailValidator';
import {colors} from '../../theme/styles';

export default function ResetPasswordScreen({navigation}) {
  const [email, setEmail] = useState({value: '', error: ''});

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({...email, error: emailError});
      return;
    }
    navigation.navigate('LoginScreen');
  };

  return (
    <Background>
      <StatusBar backgroundColor="#374F8A" />
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Khôi phục Password</Header>
      <TextInput
        label="E-mail"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({value: text, error: ''})}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Chúng tôi sẽ gửi email để khôi phục password."
        theme={{colors: {primary: colors.blue, underlineColor: 'transparent'}}}
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{marginTop: 16}}>
        GỬI
      </Button>
    </Background>
  );
}

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/Authentication/LoginScreen';
import StartScreen from '../screens/Authentication/StartScreen';
import RegisterScreen from '../screens/Authentication/RegisterScreen';
import ResetPasswordScreen from '../screens/Authentication/ResetPasswordScreen';
import BottomTabs from '../navigations/BottomTabs';
import HomeScreen from '../screens/Home/HomeScreen';
import FilterScreen from '../screens/Home/FilterScreen';
import AllScreen from '../screens/Home/AllScreen';
import ProductScreen from '../screens/Home/ProductScreen';
import CommentScreen from '../screens/Home/CommentScreen';
import CartScreen from '../screens/Cart/CartScreen';
import SearchScreen from '../screens/Home/SearchScreen';
import OptionScreen from '../screens/Home/OptionScreen';
import InstructionScreen from '../screens/Home/InstructionScreen';
import ReceiptScreen from '../screens/Home/ReceiptScreen';
import PaymentScreen from '../screens/Cart/PaymentScreen';

import {Provider} from 'react-native-paper';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="OptionScreen" component={OptionScreen} />
          <Stack.Screen
            name="InstructionScreen"
            component={InstructionScreen}
          />
          <Stack.Screen name="ReceiptScreen" component={ReceiptScreen} />
          <Stack.Screen name="FilterScreen" component={FilterScreen} />
          <Stack.Screen name="AllScreen" component={AllScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} />
          <Stack.Screen name="CommentScreen" component={CommentScreen} />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

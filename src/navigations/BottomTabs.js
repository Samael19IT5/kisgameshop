import {StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/Home/HomeScreen';
import HistoryScreen from '../screens/Home/HistoryScreen';
import InfoScreen from '../screens/Home/InfoScreen';
import NotificationScreen from '../screens/Home/NotificationScreen';
import {colors} from '../theme/styles';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: [
          {
            position: 'absolute',
            paddingBottom: 4,
            elevation: 0,
            height: 55,
            ...styles.shadow,
          },
        ],
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: ({focused}) => {
            let color = focused ? colors.red : 'grey';
            return <Text style={{color: color, fontSize: 12}}>HOME</Text>;
          },
          tabBarIcon: ({focused}) => {
            let name = focused ? 'home' : 'home-outline';
            let color = focused ? colors.red : 'grey';
            return <Ionicons name={name} size={25} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarLabel: ({focused}) => {
            let color = focused ? colors.yellow : 'grey';
            return <Text style={{color: color, fontSize: 12}}>LỊCH SỬ</Text>;
          },
          tabBarIcon: ({focused}) => {
            let name = focused ? 'receipt' : 'receipt-outline';
            let color = focused ? colors.yellow : 'grey';
            return <Ionicons name={name} size={25} color={color}></Ionicons>;
          },
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: ({focused}) => {
            let color = focused ? colors.blue : 'grey';
            return <Text style={{color: color, fontSize: 12}}>THÔNG BÁO</Text>;
          },
          tabBarIcon: ({focused}) => {
            let name = focused ? 'notifications' : 'notifications-outline';
            let color = focused ? colors.blue : 'grey';
            return <Ionicons name={name} size={25} color={color}></Ionicons>;
          },
        }}
      />
      <Tab.Screen
        name="InfoScreen"
        component={InfoScreen}
        options={{
          tabBarLabel: ({focused}) => {
            let color = focused ? colors.green : 'grey';
            return <Text style={{color: color, fontSize: 12}}>TÔI</Text>;
          },
          tabBarIcon: ({focused}) => {
            let name = focused ? 'person' : 'person-outline';
            let color = focused ? colors.green : 'grey';
            return <Ionicons name={name} size={25} color={color}></Ionicons>;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

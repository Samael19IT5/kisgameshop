import {StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderEmpty from '../../components/Home/HeaderEmpty';
import Notify from '../../components/Home/Notify';
import {db, auth} from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import localization from 'moment/locale/vi';

export default function NotificationScreen() {
  const [notifies, setNotifications] = React.useState([]);

  useEffect(() => {
    moment.updateLocale('vi', localization);
    const fetchNotify = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user');
        if (jsonValue) {
          const user = JSON.parse(jsonValue);
          const itemsRef = db
            .collection('notify')
            .where('userId', '==', user.uid);
          await itemsRef.onSnapshot(snapshot => {
            setNotifications(
              snapshot.docs.map(doc => ({
                id: doc.id,
                created_at: doc.data().created_at,
                content: doc.data().content,
                userId: doc.data().userId,
                image: doc.data().image,
              })),
            );
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchNotify();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3FC1A5" />
      <HeaderEmpty name="THÔNG BÁO" />
      <FlatList
        data={notifies}
        renderItem={({item}) => (
          <Notify
            id={item.id}
            content={item.content}
            userId={item.userId}
            image={item.image}
            time={moment(item.created_at.toDate()).fromNow()}
          />
        )}
        keyExtractor={item => item.id}
      />
      <View style={{height: 55}}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

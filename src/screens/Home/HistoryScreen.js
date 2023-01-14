import {StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderEmpty from '../../components/Home/HeaderEmpty';
import Card from '../../components/Home/Card';
import {db, auth} from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistoryScreen() {
  const [orders, setOrders] = React.useState([]);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user');
        if (jsonValue) {
          const user = JSON.parse(jsonValue);
          const itemsRef = db
            .collection('order')
            .where('userId', '==', user.uid)
            .orderBy('created_at', 'desc');
          await itemsRef.onSnapshot(snapshot => {
            setOrders(
              snapshot.docs.map(doc => ({
                id: doc.id,
                created_at: doc.data().created_at,
                status: doc.data().status,
                userId: doc.data().userId,
                contact: doc.data().contact,
                address: doc.data().address,
              })),
            );
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchOrder();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3FC1A5" />
      <HeaderEmpty name="LỊCH SỬ ĐƠN HÀNG" />
      <FlatList
        data={orders}
        renderItem={({item}) => (
          <Card
            id={item.id}
            name={'Mã đơn: ' + item.id}
            time={item.created_at?item.created_at.toDate().toLocaleString('en-GB'):''}
            status={item.status}
            contact={item.contact}
            address={item.address}
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

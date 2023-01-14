import {Text, StyleSheet, View, FlatList, Alert, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Cart/Header';
import Item from '../../components/Cart/Item';
import Line from '../../components/Home/Line';
import ButtonOrder from '../../components/Cart/ButtonOrder';
import {colors} from '../../theme/styles';
import {db, auth} from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {numberWithCommas} from '../../utils/numberWithCommas';

export default function CartScreen({navigation}) {
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState([]);

  const orderItem = () => {
    if (items.length > 0) {
      navigation.navigate('PaymentScreen');
    } else {
      Alert.alert('Giỏ hàng đang trống', 'Vui lòng thêm sản phẩm!');
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user');
        if (jsonValue) {
          const user = JSON.parse(jsonValue);
          const itemsRef = db
            .collection('cart')
            .where('userId', '==', user.uid);
          await itemsRef.onSnapshot(snapshot => {
            setItems(
              snapshot.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name,
                price: doc.data().price,
                quantity: doc.data().quantity,
                itemId: doc.data().itemId,
                image: doc.data().image,
              })),
            );
            let sum = 0;
            snapshot.forEach(doc => {
              sum += doc.data().price * doc.data().quantity;
            });
            setValue(sum);
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
      <Header name="GIỎ HÀNG CỦA BẠN" goBack={navigation.goBack} />
      <FlatList
        data={items}
        renderItem={({item}) => (
          <Item
            id={item.id}
            name={item.name}
            image={item.image}
            quantity={item.quantity}
            itemId={item.itemId}
            price={item.price}
          />
        )}
        keyExtractor={item => item.id}
      />
      <View>
        <View style={styles.total_price}>
          <Text>TỔNG TIỀN</Text>
          <Text style={styles.text_price}>{numberWithCommas(value)} đ</Text>
        </View>
        <ButtonOrder name="ĐẶT HÀNG" doOrder={orderItem} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  total_price: {
    marginHorizontal: 16,
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_price: {
    color: colors.red,
    fontSize: 16,
  },
});

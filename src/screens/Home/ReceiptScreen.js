import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderBack from '../../components/Home/HeaderBack';
import ItemOrder from '../../components/Cart/ItemOrder';
import {colors} from '../../theme/styles';
import {db, auth} from '../../../firebase';
import {numberWithCommas} from '../../utils/numberWithCommas';

export default function ReceiptScreen({navigation, route}) {
  const [details, setDetails] = React.useState([]);
  const [value, setValue] = React.useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const itemsRef = db
        .collection('orderDetail')
        .where('orderId', '==', route.params.idOrder);
      await itemsRef.onSnapshot(snapshot => {
        setDetails(
          snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            price: numberWithCommas(doc.data().price),
            quantity: doc.data().quantity,
            image: doc.data().image,
          })),
        );
        let sum = 0;
        snapshot.forEach(doc => {
          sum += doc.data().price * doc.data().quantity;
        });
        setValue(sum);
      });
    };
    fetchDetails();
  }, []);

  return (
    <ScrollView>
      <StatusBar backgroundColor="#3FC1A5" />
      <HeaderBack name="CHI TIẾT ĐƠN HÀNG" goBack={navigation.goBack} />
      <Text style={styles.text}>Chi tiết sản phẩm: </Text>
      {details.map((detail, index) => (
        <ItemOrder
          key={detail.id}
          name={detail.name}
          image={detail.image}
          price={detail.price}
          quantity={detail.quantity}
        />
      ))}
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>Tổng cộng: </Text>
        <Text style={styles.price}>{numberWithCommas(value)} đ</Text>
      </View>

      <Text style={styles.text}>Liên hệ: {route.params.contact} </Text>
      <Text style={styles.text}>Địa chỉ: {route.params.address} </Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.text}>Tình trạng: </Text>
        <Text style={styles.status}>{route.params.status}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 16,
    marginVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.yellow,
  },
  price: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.red,
  },
});

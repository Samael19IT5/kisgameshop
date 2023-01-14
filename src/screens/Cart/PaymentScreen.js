import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Cart/Header';
import TextArea from '../../components/Cart/TextArea';
import NumberInput from '../../components/Cart/NumberInput';
import ItemOrder from '../../components/Cart/ItemOrder';
import ButtonOrder from '../../components/Cart/ButtonOrder';
import {db, auth} from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {numberWithCommas} from '../../utils/numberWithCommas';
import {phoneValidator} from '../../utils/phoneValidator';
import {serverTimestamp} from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import {colors} from '../../theme/styles';

export default function PaymentScreen({navigation}) {
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState([]);
  const [user, setUser] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [phone, setPhone] = useState();
  const [address, setAddress] = React.useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user');
        if (jsonValue) {
          const userget = JSON.parse(jsonValue);
          setUser(userget.uid);
          const itemsRef = db
            .collection('cart')
            .where('userId', '==', userget.uid);
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

  const sendOrder = () => {
    const errorPhone = phoneValidator(phone);
    if (errorPhone != '') {
      Alert.alert('Lỗi thông tin', errorPhone);
    } else {
      setLoading(true);
      db.collection('order')
        .add({
          created_at: serverTimestamp(),
          status: 'Đang xử lý',
          userId: user,
          contact: phone,
          address: address,
        })
        .then(docRef => {
          items.forEach(item => {
            var updateRef = db.collection('product').doc(item.itemId);
            updateRef.update({
              quantity: firebase.firestore.FieldValue.increment(
                0 - item.quantity,
              ),
            });
            db.collection('orderDetail')
              .add({
                orderId: docRef.id,
                productId: item.itemId,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
              })
              .then(docRef2 => {
                console.log('Document written with ID: ', docRef2.id);
              })
              .catch(error => {
                console.error('Error adding document: ', error);
              });
            console.log('Document written with ID: ', docRef.id);
          });
          db.collection('cart')
            .where('userId', '==', user)
            .get()
            .then(querySnapshot => {
              querySnapshot.forEach(doc => {
                db.collection('cart')
                  .doc(doc.id)
                  .delete()
                  .then(() => {
                    console.log('Document successfully deleted!');
                  })
                  .catch(error => {
                    console.error('Error removing document: ', error);
                  });
              });
            })
            .catch(error => {
              console.log('Error getting documents: ', error);
            });
          Alert.alert('Đã gửi đơn hàng', 'Đơn hàng của bạn đang được xử lý!');
          navigation.reset({
            index: 0,
            routes: [{name: 'BottomTabs'}],
          });
        })
        .catch(error => {
          console.error('Error adding document: ', error);
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
          <Header name="THÔNG TIN ĐƠN HÀNG" goBack={navigation.goBack} />
          <TextArea />
          <NumberInput value={phone} onChangeText={text => setPhone(text)} />
          <Text style={styles.text}>Sản phẩm</Text>
          <FlatList
            data={items}
            renderItem={({item}) => (
              <ItemOrder
                id={item.id}
                name={item.name}
                image={item.image}
                quantity={item.quantity}
                itemId={item.itemId}
                price={numberWithCommas(item.price)}
              />
            )}
            keyExtractor={item => item.id}
          />
          <View style={styles.total_price}>
            <Text>TỔNG TIỀN</Text>
            <Text style={styles.text_price}>{numberWithCommas(value)} đ</Text>
          </View>
          <ButtonOrder name="HOÀN TẤT" doOrder={sendOrder} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    marginLeft: 16,
    marginBottom: 4,
  },
  scroll: {},
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
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

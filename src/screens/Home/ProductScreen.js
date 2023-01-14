import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Product/Header';
import ImageProduct from '../../components/Product/ImageProduct';
import ButtonProduct from '../../components/Product/ButtonProduct';
import Comment from '../../components/Product/Comment';
import Readmore from '../../components/Product/Readmore';
import Banner from '../../components/Product/Banner';
import RelateCard from '../../components/Home/RelateCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../theme/styles';
import {db} from '../../../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {serverTimestamp} from 'firebase/firestore';

function numberWithCommas(x) {
  if (x !== undefined) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}

export default function ProductScreen({route, navigation}) {
  const [product, setProduct] = React.useState([]);
  const [quantity, setQuantity] = React.useState(1);
  const [comments, setComments] = React.useState([]);
  const [relate, setRelate] = React.useState([]);
  const [text, setText] = React.useState();

  const productRef = db.collection('product').doc(route.params.idProduct).get();

  const commentRef = db
    .collection('comment')
    .where('productId', '==', route.params.idProduct)
    .limit(2);

  useEffect(() => {
    try {
      const fetchProduct = async () => {
        await productRef.then(doc => {
          setProduct({id: doc.id, ...doc.data()});
          var tmp = doc.data().relate;
          var products = [];
          if (tmp) {
            relateRef = db.collection('product');
            const fetchRelate = async () => {
              await relateRef.onSnapshot(snapshot => {
                snapshot.forEach(item => {
                  if (tmp.indexOf(item.id) > -1) {
                    products.push({id: item.id, ...item.data()});
                  }
                });
                setRelate(products);
              });
            };
            fetchRelate();
          }
        });
      };
      fetchProduct();
    } catch (error) {}
    try {
      const fetchComment = async () => {
        await commentRef.onSnapshot(snapshot => {
          setComments(
            snapshot.docs.map(doc => ({
              id: doc.id,
              name: doc.data().name,
              image: doc.data().image,
              content: doc.data().content,
              created_at: doc.data().created_at,
              userId: doc.data().created_at,
            })),
          );
        });
      };
      fetchComment();
    } catch (error) {}
  }, []);

  const onCheckLimit = (value: string) => {
    const parsedQty = Number.parseInt(value);
    const limit = product.quantity;
    if (parsedQty > limit) {
      setQuantity(limit.toString());
    } else {
      setQuantity(parsedQty);
    }
  };

  const checkValid = (value: string) => {
    const parsedQty = Number.parseInt(value);
    if (Number.isNaN(parsedQty) || parsedQty < 1) {
      Alert.alert('Lỗi', 'Số lượng không hợp lệ!');
      return false;
    }
    return true;
  };

  const buyNow = () => {
    const addData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user');
        if (jsonValue) {
          const user = JSON.parse(jsonValue);
          if (user) {
            db.collection('cart')
              .where('itemId', '==', product.id)
              .where('userId', '==', user.uid)
              .get()
              .then(querySnapshot => {
                if (querySnapshot.size == 0) {
                  db.collection('cart').add({
                    userId: user.uid,
                    itemId: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: quantity,
                    limit: product.quantity,
                  });
                } else {
                  querySnapshot.forEach(doc => {
                    db.collection('cart').doc(doc.id).update({
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      quantity: quantity,
                      limit: product.quantity,
                    });
                  });
                }
              })
              .catch(error => {
                console.log('Error getting documents: ', error);
              });
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (checkValid(quantity)) {
      addData();
      navigation.navigate('CartScreen');
    }
  };

  const addToCart = () => {
    const addCart = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@user');
        if (jsonValue) {
          const user = JSON.parse(jsonValue);
          if (user) {
            db.collection('cart')
              .where('itemId', '==', product.id)
              .where('userId', '==', user.uid)
              .get()
              .then(querySnapshot => {
                if (querySnapshot.size == 0) {
                  db.collection('cart').add({
                    userId: user.uid,
                    itemId: product.id,
                    name: product.name,
                    image: product.image,
                    price: product.price,
                    quantity: quantity,
                    limit: product.quantity,
                  });
                } else {
                  querySnapshot.forEach(doc => {
                    db.collection('cart').doc(doc.id).update({
                      name: product.name,
                      image: product.image,
                      price: product.price,
                      quantity: quantity,
                      limit: product.quantity,
                    });
                  });
                }
              })
              .catch(error => {
                console.log('Error getting documents: ', error);
              });
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (checkValid(quantity)) {
      addCart();
      Alert.alert('Thành công!', 'Đã thêm vào giỏ hàng!');
    }
  };

  const sendComment = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@user');
      if (jsonValue) {
        const store = JSON.parse(jsonValue);
        var docRef = db.collection('user').doc(store.uid);
        docRef
          .get()
          .then(doc => {
            if (doc.exists) {
              db.collection('comment')
                .add({
                  content: text,
                  created_at: serverTimestamp(),
                  image: doc.data().image,
                  name: doc.data().username,
                  productId: route.params.idProduct,
                  userId: doc.id,
                })
                .then(docRef => {
                  console.log('Document written with ID: ', docRef.id);
                  setText();
                })
                .catch(error => {
                  console.error('Error adding document: ', error);
                });
            } else {
              console.log('No such document!');
            }
          })
          .catch(error => {
            console.log('Error getting document:', error);
          });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3FC1A5" />
      <Header goBack={navigation.goBack} />
      <ScrollView nestedScrollEnable={true}>
        <ImageProduct image={product.image} />
        <View>
          <Text style={styles.title}>{product.name}</Text>
        </View>
        <View>
          <Text style={styles.price}>{numberWithCommas(product.price)} đ</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={{marginHorizontal: 8}}>Số lượng:</Text>
          <TextInput
            value={quantity}
            style={styles.input}
            onChangeText={onCheckLimit}
            keyboardType="number-pad"
            defaultValue="1"
            otherProps
            maxLength={3}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <ButtonProduct name="ĐẶT NGAY" doCart={buyNow} />
          <ButtonProduct name="THÊM VÀO GIỎ" doCart={addToCart} />
        </View>
        <View style={styles.description}>
          <Text>MÔ TẢ SẢN PHẨM</Text>
          <Text>{product.description}</Text>
        </View>
        <Banner name="sản phẩm liên quan" />
        <FlatList
          data={relate}
          renderItem={({item}) => (
            <RelateCard
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          )}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Banner name="đánh giá người dùng" />
        {comments.map((comment, index) => (
          <Comment
            key={comment.id}
            id={comment.id}
            name={comment.name}
            image={comment.image}
            content={comment.content}
            time={
              comment.created_at
                ? comment.created_at.toDate().toLocaleString('en-GB')
                : ''
            }
          />
        ))}
        {comments.length ? (
          <Readmore
            name="Xem Tất Cả"
            doSee={() => navigation.navigate('CommentScreen', {id: product.id})}
          />
        ) : (
          <View
            style={{
              padding: 8,
              marginBottom: 16,
            }}>
            <Text style={{marginVertical: 10}}>
              Chưa có đánh giá nào. Hãy viết đánh giá đầu tiên!
            </Text>
            <View style={styles.commentc}>
              <TextInput
                style={styles.inputc}
                returnKeyType="done"
                placeholder="Đánh giá của bạn..."
                defaultValue={text}
                onChangeText={newText => setText(newText)}
              />
              <TouchableOpacity onPress={() => sendComment()}>
                <Icon name="send" style={styles.icon}></Icon>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: 8,
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    margin: 8,
    fontSize: 16,
    color: colors.red,
  },
  input: {
    width: 40,
    height: 30,
    margin: 12,
    borderWidth: 1,
    padding: 8,
  },
  description: {
    flex: 1,
    margin: 8,
    padding: 8,
    borderWidth: 1,
    minHeight: 150,
    borderColor: colors.yellow,
  },
  comment: {
    padding: 8,
  },
  commentc: {
    flexDirection: 'row',
  },
  inputc: {
    borderWidth: 1,
    flex: 1,
    height: 40,
    fontSize: 16,
    padding: 8,
    color: colors.secondary,
    borderColor: colors.secondary,
  },
  icon: {
    margin: 8,
    width: 40,
    fontSize: 32,
    color: colors.blue,
  },
});

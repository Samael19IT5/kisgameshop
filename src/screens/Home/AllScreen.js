import {StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
import HeaderBack from '../../components/Home/HeaderBack';
import React, {useState, useEffect} from 'react';
import ProductCard from '../../components/Home/ProductCard';
import {db, auth} from '../../../firebase';

export default function AllScreen({navigation}) {
  const [products, setProducts] = React.useState([]);
  const [lastDocument, setLastDocument] = useState(10);
  const [quantity, setQuantity] = React.useState();

  useEffect(() => {
    try {
      const ref = db.collection('product');
      const checkQuan = async () => {
        await ref.onSnapshot(snapshot => {
          if (!quantity) {
            setQuantity(snapshot.size);
          }
        });
      };
      checkQuan();
    } catch (error) {}
  });

  useEffect(() => {
    try {
      const productsRef = db.collection('product').limit(lastDocument);
      const fetchProducts = async () => {
        await productsRef.onSnapshot(snapshot => {
          setProducts(
            snapshot.docs.map(doc => ({
              id: doc.id,
              name: doc.data().name,
              image: doc.data().image,
              price: doc.data().price,
            })),
          );
        });
      };
      fetchProducts();
    } catch (error) {}
  });

  const checkItem = () => {
    if (lastDocument + 8 < quantity) {
      setLastDocument(lastDocument + 8);
    } else if (lastDocument + 8 > quantity) {
      setLastDocument(quantity);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3FC1A5" />
      <HeaderBack name="TẤT CẢ SẢN PHẨM" goBack={navigation.goBack} />
      <FlatList
        numColumns={2}
        data={products}
        onEndReached={checkItem}
        renderItem={({item}) => (
          <ProductCard
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

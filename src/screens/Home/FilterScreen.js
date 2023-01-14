import {StyleSheet, Text, View, FlatList, StatusBar} from 'react-native';
import HeaderBack from '../../components/Home/HeaderBack';
import React, {useState, useEffect} from 'react';
import ProductCard from '../../components/Home/ProductCard';
import {db, auth} from '../../../firebase';

export default function FilterScreen({navigation, route}) {
  const type = route.params.type;
  const [title, setTitle] = React.useState();
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    const titleRef = db.collection(type).doc(route.params.id).get();
    try {
      const fetchTitle = async () => {
        await titleRef.then(doc => {
          setTitle(doc.data().name);
        });
      };
      fetchTitle();
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      var collection;
      if (type == 'category') {
        collection = 'categoryId';
      } else if (type == 'banner') {
        collection = 'bannerId';
      }
      const productsRef = db
        .collection('product')
        .where(collection, '==', route.params.id);
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
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3FC1A5" />
      <HeaderBack name={title} goBack={navigation.goBack} />
      <FlatList
        numColumns={2}
        data={products}
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

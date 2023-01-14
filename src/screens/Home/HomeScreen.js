import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../components/Home/Header';
import CategoryCard from '../../components/Home/CategoryCard';
import Banner from '../../components/Home/Banner';
import BannerAll from '../../components/Home/BannerAll';
import Line from '../../components/Home/Line';
import ProductCard from '../../components/Home/ProductCard';
import {db, auth} from '../../../firebase';

export default function HomeScreen({navigation}) {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [families, setFamilies] = useState([]);
  const [parties, setParties] = useState([]);

  categoriesRef = db.collection('category');

  productsRef = db.collection('product').limit(6);

  familiesRef = db
    .collection('product')
    .where('bannerId', '==', 'nOFGsMtLy5bDkE9nhvVy')
    .limit(6);

  partiesRef = db
    .collection('product')
    .where('bannerId', '==', '40FPdHHB9HHEbdTMZlfb')
    .limit(6);

  useEffect(() => {
    const fetchCategories = async () => {
      await categoriesRef.onSnapshot(snapshot => {
        setCategories(
          snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            image: doc.data().image,
          })),
        );
      });
    };
    fetchCategories();
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const fetchFamilies = async () => {
      await familiesRef.onSnapshot(snapshot => {
        setFamilies(
          snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            image: doc.data().image,
            price: doc.data().price,
          })),
        );
      });
    };
    fetchFamilies();
  }, []);

  useEffect(() => {
    const fetchParties = async () => {
      await partiesRef.onSnapshot(snapshot => {
        setParties(
          snapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            image: doc.data().image,
            price: doc.data().price,
          })),
        );
      });
    };
    fetchParties();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3FC1A5" />
      <Header doCart={() => navigation.navigate('CartScreen')} />
      <ScrollView nestedScrollEnable={true}>
        <FlatList
          data={categories}
          renderItem={({item}) => (
            <CategoryCard id={item.id} name={item.name} image={item.image} />
          )}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
        <Line />
        <Banner id="nOFGsMtLy5bDkE9nhvVy" title="Gắn kết gia đình" />
        <FlatList
          data={families}
          renderItem={({item}) => (
            <ProductCard
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
        <Banner id="40FPdHHB9HHEbdTMZlfb" title="Team building cực cháy" />
        <FlatList
          data={parties}
          renderItem={({item}) => (
            <ProductCard
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
        <BannerAll title="Tất cả sản phẩm" />
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
            />
          ))}
        </ScrollView>
        <View style={{height: 55}}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

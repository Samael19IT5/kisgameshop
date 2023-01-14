import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BarShow from '../../components/Home/BarShow';
import Line from '../../components/Home/Line';
import ProductCard from '../../components/Home/ProductCard';
import Paragraph from '../../components/Home/Paragraph';
import {db} from '../../../firebase';
import {Picker} from '@react-native-picker/picker';

export default function SearchScreen({navigation, route}) {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState(0);
  const [sort, setSort] = useState('name');

  productsRef = db.collection('product');

  const fetchProducts = async (filter, sort) => {
    if (sort == 'name') {
      productsRef = productsRef.orderBy('label', 'asc');
    } else if (sort == 'price') {
      productsRef = productsRef.orderBy('price', 'asc');
    }
    console.log(sort);
    await productsRef.onSnapshot(snapshot => {
      var check = [];
      snapshot.forEach(product => {
        const tmp = product.data().name.toLowerCase();
        const vls = route.params.vls.toLowerCase();
        if (tmp.includes(vls)) {
          l = product.data();
          l['id'] = product.id;
          check.push(l);
        }
      });
      if (filter == -1) {
        setProducts(check.reverse());
      } else {
        setProducts(check);
      }
    });
  };

  useEffect(() => {
    fetchProducts(filter, sort);
  }, []);

  const reverseProduct = () => {
    var ck;
    if (filter == 0) {
      ck = -1;
      setFilter(-1);
    } else {
      ck = 0;
      setFilter(0);
    }
    fetchProducts(ck, sort);
  };

  const sortProduct = itemValue => {
    setSort(itemValue);
    const ck = itemValue;
    fetchProducts(filter, ck);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3FC1A5" />
      <BarShow goBack={navigation.goBack} doFilter={reverseProduct} />

      <View style={styles.sort}>
        <Paragraph>Tìm kiếm cho: {route.params.vls}</Paragraph>
        <Picker
          style={styles.select}
          selectedValue={sort}
          onValueChange={(itemValue, itemIndex) => {
            sortProduct(itemValue);
          }}>
          <Picker.Item label="Sẵp xếp theo tên" value="name" />
          <Picker.Item label="Sắp xếp theo giá" value="price" />
        </Picker>
      </View>

      <Line />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sort: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  select: {
    width: '55%',
  },
});
